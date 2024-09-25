import type { EScheduleType } from '~/types/schedule/EScheduleType'
import type { ITechnicalFields } from '~/types/common'
import type { JSONContent } from '@tiptap/core'

export interface IScheduleModel extends ITechnicalFields {
  _id?: string
  type: EScheduleType
  description: JSONContent
}
