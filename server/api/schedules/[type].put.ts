import type { IScheduleModel } from '~/types/schedule'
import { ScheduleModel } from '~/server/models/schedule.model'

export default defineEventHandler<{ body: IScheduleModel }>(async (event) => {
  const body = await readBody(event)
  const type = getRouterParam(event, 'type')

  try {
    const res = await ScheduleModel.findOneAndUpdate({ type }, body, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    })

    return {
      res
    }
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
