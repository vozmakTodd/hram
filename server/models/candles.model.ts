import { defineMongooseModel } from '#nuxt/mongoose'
import { ECandle, type ICandleModel } from '~/types/candles'

export const CandleModel = defineMongooseModel<ICandleModel>({
  name: 'Candle',
  schema: {
    list: [
      {
        type: String,
        enum: Object.values(ECandle)
      }
    ],
    email: {
      type: String
    }
  },
  options: {
    timestamps: true
  }
})
