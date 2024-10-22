import { EDemandType } from '~/types/demands'

export const DEMAND_TYPE_MESSAGE: Record<EDemandType, string> = {
  [EDemandType.MOLEBEN]: 'Молебен на 1 раз',
  [EDemandType.MOLEBEN_S_AKAFISTOM]: 'Сорокоуст (40 дней)',
  [EDemandType.PANIHIDA]: 'Панихида 1 раз',
  [EDemandType.POMINOVENIE_L]: 'Поминовение на литургии 1 раз',
  [EDemandType.POMINOVENIE_POST]: 'Поминовение на Великий пост',
  [EDemandType.SOROKOUST]: 'Молебен с акафистом вмч. Георгию Победоносцу 1 раз'
}
