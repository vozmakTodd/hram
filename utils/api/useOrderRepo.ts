import type { ICandleModel, IDemandModel } from '~/types/order'

export const useOrderRepo = () => ({
  async post(body: ICandleModel | IDemandModel): Promise<{
    id: string
  }> {
    return $fetch(`/api/orders`, {
      method: 'POST',
      body: { model: body }
    })
  }
})
