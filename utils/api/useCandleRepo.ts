import type { ICandleModel } from '~/types/candles'

export const useCandleRepo = () => ({
  async post(body: ICandleModel) {
    return $fetch(`/api/candles`, {
      method: 'POST',
      body: { model: body }
    })
  }
})
