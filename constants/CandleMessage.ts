import { ECandle } from '~/types/candles'

export const CANDLE_MESSAGE: Record<ECandle, string> = {
  [ECandle.CHRIST]: 'Икона Господа Иисуса Христа (иконостас)',
  [ECandle.KIPR]: 'Икона Божией Матери «Кипрская» (иконостас)',
  [ECandle.VSECARICA]: 'Икона Божией Матери «Всецарица» (иконостас)',
  [ECandle.VZISKANIE]: 'Икона Божией Матери «Взыскание погибших»',
  [ECandle.MATRONA]: 'Икона блаженной Матроны Московской',
  [ECandle.NIKOLAY]: 'Икона Святителю Николаю Чудотворцу',
  [ECandle.GEORGIY]: 'Икона вмч.Георгия Победоносца',
  [ECandle.PANTELIMION]: 'Икона вмч. Пантелеимона',
  [ECandle.IOAN]: 'Икона св. прав. Иоанна Кронштадтского',
  [ECandle.GOLGOFA]: 'Голгофа (Распятие Иисуса Христа)',
  [ECandle.KONON]: 'На канон (о упокоении)'
}
