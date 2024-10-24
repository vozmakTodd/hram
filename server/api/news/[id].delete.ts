import { NewsModel } from '~/server/models/news.model'
import { ENewsType } from '~/types/news'
import fs from 'node:fs'
import { getToken } from '#auth'

export default defineEventHandler(async (event) => {
  const token = await getToken({ event })

  if (!token) {
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  const id = getRouterParam(event, 'id')

  try {
    const news = await NewsModel.findByIdAndDelete(id)

    if (!news) {
      return createError({
        statusCode: 400,
        statusMessage: `News with id ${id} does not exist`
      })
    }

    if (news.type === ENewsType.TEXT) {
      news.images?.forEach((val) => {
        fs.unlink(`public/news/${val.file}${val.extension}`, (err) => {
          if (err) {
            console.error(`Error removing file ${val.file}${val.extension}: ${err}`)
            return
          }
        })
      })
    }
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
