import type { TCreateNewsReq } from '~/types/news/api'

export const addNews = async (body: TCreateNewsReq) => {
  const { $api } = useNuxtApp()

  await $api('/news', {
    method: 'POST',
    body
  })
}
