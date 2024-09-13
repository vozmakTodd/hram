import type { TNews } from '~/types/news/INewsModel'

export interface IGetNewsRes {
  content: TNews[]
  pagination: {
    page: number
    lastPage: number
  }
}
