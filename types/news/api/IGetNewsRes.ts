import type { ITextNewsBaseModel, IVideoNewsBaseModel } from '~/types/news/INewsBaseModal'

export interface IGetNewsRes {
  content: Array<
    ITextNewsBaseModel<Record<'name' | 'extension' | 'file', string>> | IVideoNewsBaseModel
  >
  pagination: {
    page: number
    lastPage: number
  }
}
