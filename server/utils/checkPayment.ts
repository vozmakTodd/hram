import Checkout from '../constants/Checkout'
import { OrderModel } from '../models/order.model'

export const checkPayment = async (paymentId: string) => {
  try {
    const order = await OrderModel.findOne({ 'paymentData.id': paymentId })

    if (order) {
      console.info(
        `Check payment - Info: Beginning payment status poling process for paymentId ${paymentId} :: `,
        new Date()
      )

      const paymentCheckInterval = setInterval(async () => {
        try {
          const res = await Checkout.getPayment(paymentId)

          console.info(
            `Check payment - Info: Received new status for paymentId ${paymentId} New status - ${res.status} :: `,
            new Date()
          )

          if (res.status !== 'pending') {
            order.paymentData!.status = res.status
            const data = await order.save()
            console.info(
              `Check payment - Info: New status has been saved for order data: ${data} :: `,
              new Date()
            )
            clearInterval(paymentCheckInterval)
          }
        } catch (e) {
          console.error(`Check payment - Error: ${e} :: `, new Date())
          clearInterval(paymentCheckInterval)
        }
      }, 540000)
    } else {
      throw new Error(`Order with paymentId: ${paymentId}`)
    }
  } catch (e) {
    console.error(`Check payment - Error: ${e} :: `, new Date())
  }
}
