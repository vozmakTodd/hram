import { NewsModel } from '~/server/models/news.model'
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'node:fs'
import type { ITextNewsBaseModel, IVideoNewsBaseModel } from '~/types/news'
import { ENewsType } from '~/types/news'

export default defineEventHandler<{
  body:
    | IVideoNewsBaseModel
    | ITextNewsBaseModel<{ name: string; extension: string; file: number[] }>
}>(async (event) => {
  const body = await readBody(event)

  try {
    let id

    if (body.type === ENewsType.VIDEO) {
      const res = await new NewsModel(body).save()

      id = res.id
    } else {
      const data: Omit<ITextNewsBaseModel<Record<'name' | 'extension' | 'file', string>>, '_id'> = {
        title: body.title,
        description: body.description,
        type: body.type,
        images: []
      }

      if (body.images) {
        body.images.forEach((image) => {
          const fileId = uuidv4()

          fs.writeFileSync(
            `public/news/${fileId}${image.extension}`,
            Buffer.from(new Uint8Array(image.file))
          )
          data.images!.push({ ...image, file: fileId })
        })
      }

      const res = await new NewsModel(data).save()

      id = res.id
    }

    return {
      id
    }
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
