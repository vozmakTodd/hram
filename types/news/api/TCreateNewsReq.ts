import type { JSONContent } from '@tiptap/core'
import type { ENewsType } from '~/types/news'

interface ICreateNewsReq {
  title: string
  type: ENewsType
}

export interface ICreateTextNewsReq extends ICreateNewsReq {
  images: Array<{
    file: ArrayBuffer
    name: string
    extension: string
  }>
  description?: JSONContent
  type: ENewsType.TEXT
}

export interface ICreateVideoNewsReq extends ICreateNewsReq {
  link?: string
  type: ENewsType.VIDEO
}

export type TCreateNewsReq = ICreateTextNewsReq | ICreateVideoNewsReq
