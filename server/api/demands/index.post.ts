import { DemandModel } from '~/server/models/demands.model'
import type { IDemandModel } from '~/types/demands'
import nodemailer from 'nodemailer'
import { getDemandMailRespMessage } from '~/server/utils/getDemandMailRespMessage'
import { getDemandMailMessage } from '~/server/utils/getDemandMailMessage'

export default defineEventHandler<{
  body: { model: IDemandModel }
}>(async (event) => {
  const body = await readBody(event)

  try {
    const res = await new DemandModel(body.model).save()

    if (body.model.email) {
      const userMail = await useTransporter.sendMail(getDemandMailRespMessage(body.model.email))

      console.log(nodemailer.getTestMessageUrl(userMail))
    }

    const orderMail = await useTransporter.sendMail(getDemandMailMessage(body.model))

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
