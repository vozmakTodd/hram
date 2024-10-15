import type { EScheduleType, IScheduleModel } from '~/types/schedule'

export const useScheduleRepo = () => ({
  async put(body: IScheduleModel) {
    return $fetch<{ res: IScheduleModel }>(`/api/schedules/${body.type}`, {
      method: 'PUT',
      body
    })
  },
  async get(type: EScheduleType) {
    return $fetch<{ res: IScheduleModel }>(`/api/schedules/${type}`)
  }
})
