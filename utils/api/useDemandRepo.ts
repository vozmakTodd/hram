import type { IDemandModel } from '~/types/demands'

export const useDemandRepo = () => ({
  async post(body: IDemandModel) {
    return $fetch(`/api/demands`, {
      method: 'POST',
      body: { model: body }
    })
  }
})
