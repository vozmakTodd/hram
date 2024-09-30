import { EScheduleType } from '~/types/schedule'

export const SCHEDULE_TYPE_TITLE: Record<EScheduleType, string> = {
  [EScheduleType.MAIN]: 'Расписание',
  [EScheduleType.SUNDAY_SCHOOL]: 'Воскресная школа',
  [EScheduleType.EDUCATION_FOR_ALL]: 'Занятия для детей и взрослых'
}
