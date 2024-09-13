import type { ENewsType } from '~/types/news/ENewsType'
import type { IFileModel } from '~/types/files'
import type { JSONContent } from '@tiptap/core'

export interface INewsModel {
  id: number
  title: string
  type: ENewsType
}

export interface ITextNewsModel extends INewsModel {
  description: JSONContent
  images?: IFileModel[]
  type: ENewsType.TEXT
}

export interface IVideoNewsModel extends INewsModel {
  link: string
  type: ENewsType.VIDEO
}

export type TNews = ITextNewsModel | IVideoNewsModel
