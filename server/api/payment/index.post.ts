import { OrderModel } from '~/server/models/order.model'
import type { ICreatePayment } from '@a2seven/yoo-checkout'
import Checkout from '~/server/constants/Checkout'
import { v4 as uuid } from 'uuid'
import { checkPayment } from '~/server/utils/checkPayment'

export default defineEventHandler<{
  body: { order: { id?: string; price: string } }
}>(async (event) => {
  const body = await readBody(event)

  try {
    const createPayload: ICreatePayment = {
      capture: true,
      amount: {
        value: body.order.price,
        currency: 'RUB'
      },
      save_payment_method: false,
      description: 'Пожертвование храму',
      confirmation: {
        type: 'redirect',
        return_url: process.env.ORIGIN_URL
      }
    }

    const payment = await Checkout.createPayment(createPayload, uuid())

    console.info(
      `Payment - Info: Payment has been created id: ${payment.id} with price ${payment.amount.value} ${payment.amount.currency} :: `,
      new Date()
    )

    if (body.order.id) {
      const order = await OrderModel.findById(body.order.id)

      if (!order) {
        throw new Error("Order didn't exist")
      }

      console.info(`Payment - Info: Order has been found data: `, order, ' :: ', new Date())

      order.paymentData = {
        id: payment.id,
        amount: payment.amount,
        status: payment.status
      }

      await order.save()

      console.info(`Payment - Info: Order has been updated data: `, order, ' :: ', new Date())
    } else {
      const newOrder = await new OrderModel({
        paymentData: {
          id: payment.id,
          amount: payment.amount,
          status: payment.status
        }
      }).save()

      console.info(`Payment - Info: Order has been created data: `, newOrder, ' :: ', new Date())
    }

    checkPayment(payment.id)

    return {
      confirmationUrl: payment.confirmation.confirmation_url
    }
  } catch (error) {
    console.error(
      `Payment - Error: ${typeof error === 'object' ? JSON.stringify(error) : error} :: `,
      new Date()
    )
    return createError({
      statusCode: 400,
      statusMessage: `${typeof error === 'object' ? JSON.stringify(error) : error}`
    })
  }
})
