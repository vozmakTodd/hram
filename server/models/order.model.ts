import { defineMongooseModel } from '#nuxt/mongoose'
import {
  type ICandleModel,
  type IDemandModel,
  type IOrderModel,
  ECandle,
  EDemandType
} from '~/types/order'

export const OrderModel = defineMongooseModel<IOrderModel | IDemandModel | ICandleModel>({
  name: 'Order',
  schema: {
    demand: {
      names: [{ type: String }],
      demandType: {
        type: String,
        enum: Object.values(EDemandType)
      }
    },
    candle: {
      list: [
        {
          type: String,
          enum: Object.values(ECandle)
        }
      ]
    },
    paymentData: {
      required: false,
      type: {
        id: {
          type: String
        },
        status: {
          type: String
        },
        amount: {
          value: {
            type: String
          },
          currency: {
            type: String
          }
        }
      }
    }
  },
  options: {
    timestamps: true
  }
})
