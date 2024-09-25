import type { EScheduleType, IScheduleModel } from '~/types/schedule'

export const useScheduleRepo = () => ({
  async put(body: IScheduleModel) {
    return $fetch<IScheduleModel>(`/api/schedules/${body.type}`, {
      method: 'PUT',
      body
    })
  },
  async get(type: EScheduleType) {
    return $fetch<IScheduleModel>(`/api/schedules/${type}`)
  }
})
