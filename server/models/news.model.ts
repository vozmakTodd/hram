import { defineMongooseModel } from '#nuxt/mongoose'
import { Schema } from 'mongoose'

export const NewsSchema = defineMongooseModel({
  name: 'News',
  schema: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: Schema.Types.Mixed
    },
    images: [{ name: { type: String }, extension: { type: String }, file: Schema.Types.Buffer }]
  }
})
