import { defineMongooseModel } from '#nuxt/mongoose'
import type { IDemandModel } from '~/types/demands'
import { EDemandType } from '~/types/demands'

export const DemandModel = defineMongooseModel<IDemandModel>({
  name: 'Demand',
  schema: {
    names: [{ type: String }],
    type: {
      type: String,
      enum: Object.values(EDemandType)
    },
    email: {
      type: String
    }
  },
  options: {
    timestamps: true
  }
})
