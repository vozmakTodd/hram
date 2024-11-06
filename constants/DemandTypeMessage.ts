import { EDemandType } from '~/types/order'

export const DEMAND_TYPE_MESSAGE: Record<EDemandType, string> = {
  [EDemandType.MOLEBEN]: 'Молебен (по средам согласно расписанию)',
  [EDemandType.MOLEBEN_SUTERDAY]: 'Молебен об умножении любви (по субботам)',
  [EDemandType.PANIHIDA]: 'Панихида (1 раз)',
  [EDemandType.LITURGIYA_ZDRAV]: 'Литургия о здравии (1 раз)',
  [EDemandType.LITURGIYA_YPOK]: 'Литургия о упокоении (1 раз)',
  [EDemandType.SOROKOUST_ZDRAV]: 'Сорокоуст о здравии',
  [EDemandType.SOROKOUST_YPOK]: 'Сорокоуст о упокоении'
}
