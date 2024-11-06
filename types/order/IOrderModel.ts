import type { Payment } from '@a2seven/yoo-checkout'

import type { ITechnicalFields } from '~/types/common'
import type { EDemandType, ECandle } from '.'

export interface IOrderModel extends ITechnicalFields {
  _id?: string
  paymentData?: Pick<Payment, 'amount' | 'status' | 'id'>
}

export interface IDemandModel extends IOrderModel {
  demand: {
    demandType: EDemandType
    names: string[]
  }
}

export interface ICandleModel extends IOrderModel {
  candle: {
    list: ECandle[]
  }
}
