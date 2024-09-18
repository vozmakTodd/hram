import { defineMongooseModel } from '#nuxt/mongoose'
import { ENewsType } from '~/types/news'
import { Schema } from 'mongoose'
import type { INewsMongoModel } from '~/types/news/INewsBaseModal'

export const NewsModel = defineMongooseModel<
  INewsMongoModel<Record<'name' | 'extension' | 'file', string>>
>({
  name: 'News',
  schema: {
    title: {
      type: String
    },
    type: {
      type: String,
      enum: Object.values(ENewsType)
    },
    link: {
      type: String
    },
    description: {
      type: Schema.Types.Mixed
    },
    images: [{ name: String, extension: String, file: String }]
  },
  options: {
    timestamps: true
  }
})
