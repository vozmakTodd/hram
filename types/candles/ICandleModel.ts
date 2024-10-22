import type { ITechnicalFields } from '~/types/common'
import type { ECandle } from './ECandle'

export interface ICandleModel extends ITechnicalFields {
  _id?: string
  list: ECandle[]
  email?: string
}
