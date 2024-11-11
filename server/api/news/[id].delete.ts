import { NewsModel } from '~/server/models/news.model'
import { ENewsType } from '~/types/news'
import fs from 'node:fs'
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const token = await getToken({ event })

  if (!token) {
    console.error(`News - Error: Forbidden :: `, new Date())
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  const id = getRouterParam(event, 'id')

  try {
    const news = await NewsModel.findByIdAndDelete(id)

    if (!news) {
      console.error(`News - Error: News with id ${id} does not exist :: `, new Date())
      return createError({
        statusCode: 400,
        statusMessage: `News with id ${id} does not exist`
      })
    }

    if (news.type === ENewsType.TEXT) {
      news.images?.forEach((val) => {
        fs.unlink(`server/uploads/${val.file}${val.extension}`, (err) => {
          if (err) {
            console.error(
              `News - Error: Can't remove file ${val.file}${val.extension}: ${err} :: `,
              new Date()
            )
            return
          }
        })
      })
    }
  } catch (error) {
    console.error(`News - Error: ${error} :: `, new Date())
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
