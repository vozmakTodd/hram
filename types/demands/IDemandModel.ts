import type { ITechnicalFields } from '~/types/common'
import type { EDemandType } from './EDemandType'

export interface IDemandModel extends ITechnicalFields {
  _id?: string
  type: EDemandType
  names: string[]
  email?: string
}
