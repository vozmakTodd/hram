import type { ITextNewsBaseModel, IVideoNewsBaseModel } from '~/types/news/INewsBaseModal'
import type { IFileMongoModel } from '~/types/files/IFileMongoModel'

export interface IGetNewsRes {
  content: Array<ITextNewsBaseModel<IFileMongoModel> | IVideoNewsBaseModel>
  pagination: {
    page: number
    lastPage: number
  }
}
