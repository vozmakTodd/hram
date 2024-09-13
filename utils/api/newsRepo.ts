import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { IGetNewsRes, TCreateNewsReq } from '~/types/news/api'

export const newsRepo = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async getAll(page: number) {
    return fetch<IGetNewsRes>(`/news`, {
      method: 'GET',
      params: {
        page
      }
    })
  },
  async post(body: TCreateNewsReq) {
    return fetch(`/news`, {
      method: 'POST',
      body
    })
  },
  async get(id: number) {
    return fetch<IGetNewsRes>(`/news/${id}`, {
      method: 'GET'
    })
  }
})
