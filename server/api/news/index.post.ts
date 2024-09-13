import { NewsSchema } from '~/server/models/news.model'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    console.log(body)
    const res = await new NewsSchema(body).save()

    return {
      id: res._id
    }
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
