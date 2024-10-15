import type { ENewsType } from '~/types/news/ENewsType'
import type { JSONContent } from '@tiptap/core'
import type { ITechnicalFields } from '~/types/common'

interface INewsBaseModel extends ITechnicalFields {
  _id?: string
  description: JSONContent
  title: string
  type: ENewsType
}

export interface ITextNewsBaseModel<T> extends INewsBaseModel {
  images: T[]
  type: ENewsType.TEXT
}

export interface IVideoNewsBaseModel extends INewsBaseModel {
  link: string
  type: ENewsType.VIDEO
}

export interface INewsMongoModel<T>
  extends Omit<ITextNewsBaseModel<T>, 'type'>,
    Omit<IVideoNewsBaseModel, 'type'> {
  type: ENewsType
}
