import { NewsModel } from '~/server/models/news.model'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  try {
    const res = await NewsModel.findById(id)

    return {
      res
    }
  } catch (error) {
    console.error(`News - Error: ${error} :: `, new Date())
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
