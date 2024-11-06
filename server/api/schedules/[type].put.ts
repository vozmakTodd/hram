import type { IScheduleModel } from '~/types/schedule'
import { ScheduleModel } from '~/server/models/schedule.model'
import { getToken } from '#auth'

export default defineEventHandler<{ body: IScheduleModel }>(async (event) => {
  const token = await getToken({ event })

  if (!token) {
    console.error(`Schedules - Error: Forbidden :: `, new Date())
    return createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }

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
    console.error(`Schedules - Error: ${error} :: `, new Date())
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
