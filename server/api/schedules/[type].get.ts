import { ScheduleModel } from '~/server/models/schedule.model'

export default defineEventHandler(async (event) => {
  const type = getRouterParam(event, 'type')

  try {
    const res = await ScheduleModel.findOne({ type })

    return { res }
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: `${error}`
    })
  }
})
