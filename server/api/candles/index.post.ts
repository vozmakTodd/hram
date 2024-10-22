import type { ICandleModel } from '~/types/candles'
import nodemailer from 'nodemailer'
import { getCandleMailRespMessage } from '~/server/utils/getCandleMailRespMessage'
import { getCandleMailMessage } from '~/server/utils/getCandleMailMessage'

export default defineEventHandler<{
  body: { model: ICandleModel }
}>(async (event) => {
  const body = await readBody(event)

  try {
    const res = await new CandleModel(body.model).save()

    if (body.model.email) {
      const userMail = await useTransporter.sendMail(getCandleMailRespMessage(body.model.email))

      console.log(nodemailer.getTestMessageUrl(userMail))
    }

    const orderMail = await useTransporter.sendMail(getCandleMailMessage(body.model.list))

    console.log(nodemailer.getTestMessageUrl(orderMail))

    return {
      id: res.id
    }
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
