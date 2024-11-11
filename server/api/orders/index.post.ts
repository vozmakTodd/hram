import { isDemandModel } from '~/components/typeguards'
import { OrderModel } from '~/server/models/order.model'
import { getDemandMailMessage } from '~/server/utils/getDemandMailMessage'
import type { ICandleModel, IDemandModel } from '~/types/order'

export default defineEventHandler<{
  body: { model: IDemandModel | ICandleModel }
}>(async (event) => {
  const body = await readBody(event)

  try {
    const res = await new OrderModel(body.model).save()

    console.info(`Orders - Info: Order has been created id: ${res.id} :: `, new Date())

    const orderMail = await useTransporter.sendMail(
      isDemandModel(body.model)
        ? getDemandMailMessage(body.model.demand)
        : getCandleMailMessage(body.model.candle.list)
    )

    console.info(`Orders - Info: E-mail has been sent id: ${orderMail.messageId} :: `, new Date())

    return {
      id: res.id
    }
  } catch (error) {
    console.error(`Orders - Error: ${error} :: `, new Date())
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
