import nodemailer from 'nodemailer'

const config = useRuntimeConfig()

export const useTransporter = nodemailer.createTransport({
  host: config.mailHost,
  port: Number(config.mailPort),
  auth: {
    user: config.mailUser,
    pass: config.mailPass
  }
})
