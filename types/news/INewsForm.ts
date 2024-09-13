import type { ENewsType } from '~/types/news/ENewsType'
import type { UploadUserFile } from 'element-plus'
import type { JSONContent } from '@tiptap/core'

export interface INewsForm {
  id?: string
  title: string
  type: ENewsType
}

export interface ITextNewsForm extends INewsForm {
  description?: JSONContent
  images?: UploadUserFile[]
  type: ENewsType.TEXT
}

export interface IVideoNewsForm extends INewsForm {
  link: string
  type: ENewsType.VIDEO
}

export type TNewsForm = ITextNewsForm | IVideoNewsForm
