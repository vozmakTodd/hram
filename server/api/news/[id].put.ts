import type { ITextNewsBaseModel, IVideoNewsBaseModel } from '~/types/news'
import { NewsModel } from '~/server/models/news.model'
import { ENewsType } from '~/types/news'
import type { IFileMongoModel } from '~/types/files'
import fs from 'node:fs'
import { saveImages } from '~/server/utils/saveImages'
import { getToken } from '#auth'

export default defineEventHandler<{
  body: {
    news:
      | IVideoNewsBaseModel
      | ITextNewsBaseModel<{ name: string; extension: string; file: number[] }>
    deleteFiles?: string[]
  }
}>(async (event) => {
  const token = await getToken({ event })

  if (!token) {
    console.error(`News - Error: Forbidden :: `, new Date())
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

  const body = await readBody(event)
  const id = getRouterParam(event, 'id')

  try {
    const news = await NewsModel.findById(id)

    if (!news) {
      console.error(`News - Error: News not found with id ${body.news._id} :: `, new Date())
      return createError({
        statusCode: 400,
        statusMessage: `News not found with id ${body.news._id}`
      })
    }

    if (news.type === ENewsType.TEXT && body.news.type === ENewsType.TEXT) {
      news.title = body.news.title
      news.description = body.news.description

      if (body.deleteFiles && body.deleteFiles.length && news.images) {
        news.images = news.images.reduce((acc: IFileMongoModel[], val) => {
          if (val._id && !body.deleteFiles!.includes(val._id.toString())) {
            acc.push(val)
          } else {
            fs.unlink(`public/news/${val.file}${val.extension}`, (err) => {
              if (err) {
                console.error(
                  `News - Error: Can't remove file ${val.file}${val.extension}: ${err} :: `,
                  new Date()
                )
                return
              }
            })
          }

          return acc
        }, [])
      }

      news.images = [
        ...(news.images ? news.images : []),
        ...(body.news.images ? saveImages(body.news.images) : [])
      ]
    } else if (news.type === ENewsType.VIDEO && body.news.type === ENewsType.VIDEO) {
      news.title = body.news.title
      news.link = body.news.link
    } else {
      console.error(`News - Error: News has wrong type :: `, new Date())
      return createError({
        statusCode: 400,
        statusMessage: `News has wrong type`
      })
    }

    news.save()

    return {
      res: true
    }
  } catch (error) {
    console.error(`News - Error: ${error} :: `, new Date())
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
