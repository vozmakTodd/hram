import type { IGetNewsRes } from '~/types/news/api'
import type { ITextNewsBaseModel, IVideoNewsBaseModel } from '~/types/news'
import type { IFileMongoModel } from '~/types/files'

export const useNewsRepo = () => ({
  async get(id: string) {
    return $fetch<ITextNewsBaseModel<IFileMongoModel> | IVideoNewsBaseModel>(`/api/pages/${id}`)
  },
  async getAll(page: number) {
    return $fetch<IGetNewsRes>(`/api/news`, {
      method: 'GET',
      params: {
        page
      }
    })
  },
  async post(
    body:
      | ITextNewsBaseModel<{ name: string; extension: string; file: number[] }>
      | IVideoNewsBaseModel
  ) {
    return $fetch(`/api/news`, {
      method: 'POST',
      body
    })
  },
  async put(
    id: string,
    body: {
      news:
        | IVideoNewsBaseModel
        | ITextNewsBaseModel<{ name: string; extension: string; file: number[] }>
      deleteFiles?: string[]
    }
  ) {
    return $fetch<IGetNewsRes>(`/api/news/${id}`, {
      method: 'PUT',
      body
    })
  },
  async delete(id: string) {
    return $fetch<IGetNewsRes>(`/api/news/${id}`, {
      method: 'DELETE'
    })
  }
})
