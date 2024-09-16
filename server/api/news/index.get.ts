import { NewsModel } from '~/server/models/news.model'

export default defineEventHandler<{ query: { page: number } }>(async (event) => {
  const { page } = getQuery(event)
  try {
    const res = await NewsModel.find()

    return {
      content: res,
      pagination: {
        page: page,
        lastPage: 1
      }
    }
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
