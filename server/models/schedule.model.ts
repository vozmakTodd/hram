import { Schema } from 'mongoose'
import { defineMongooseModel } from '#nuxt/mongoose'
import type { IScheduleModel } from '~/types/schedule'
import { EScheduleType } from '~/types/schedule'

export const ScheduleModel = defineMongooseModel<IScheduleModel>({
  name: 'Schedule',
  schema: {
    type: {
      type: String,
      enum: Object.values(EScheduleType)
    },
    description: {
      type: Schema.Types.Mixed
    }
  },
  options: {
    timestamps: true
  }
})
