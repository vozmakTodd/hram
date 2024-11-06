import type { IDemandModel } from '~/types/order'

export const isDemandModel = (val: unknown): val is IDemandModel => {
  const demand = val as IDemandModel

  return !!demand.demand
}
