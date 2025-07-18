import { NewsModel } from '~/server/models/news.model'
import type { ITextNewsBaseModel, IVideoNewsBaseModel } from '~/types/news'
import { ENewsType } from '~/types/news'
import type { IFileMongoModel } from '~/types/files'
import { saveImages } from '~/server/utils/saveImages'
import { getToken } from '#auth'

export default defineEventHandler<{
  body:
    | IVideoNewsBaseModel
    | ITextNewsBaseModel<{ name: string; extension: string; file: number[] }>
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

  try {
    let id

    if (body.type === ENewsType.VIDEO) {
      const res = await new NewsModel(body).save()

      id = res.id
    } else {
      const data: Omit<ITextNewsBaseModel<IFileMongoModel>, '_id'> = {
        title: body.title,
        description: body.description,
        type: body.type,
        images: body.images ? await saveImages(body.images) : []
      }

      const res = await new NewsModel(data).save()

      id = res.id
    }

    return {
      id
    }
  } catch (error) {
    console.error(`News - Error: ${error} :: `, new Date())
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
