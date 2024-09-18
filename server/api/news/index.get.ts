import { NewsModel } from '~/server/models/news.model'

export default defineEventHandler<{ query: { page: number } }>(async (event) => {
  const PAGE_SIZE = 10
  const { page } = getQuery(event)
  try {
    const res = await NewsModel.find()
      .skip(page * PAGE_SIZE)
      .limit(PAGE_SIZE)
    const count = await NewsModel.countDocuments()

    return {
      content: res,
      pagination: {
        page: page,
        lastPage: Math.ceil(count / PAGE_SIZE)
      }
    }
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
