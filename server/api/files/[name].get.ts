import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (name) {
    const filePath = path.join(process.cwd(), 'server/uploads', name)

    if (fs.existsSync(filePath)) {
      return sendStream(event, fs.createReadStream(filePath))
    } else {
      console.error('Files - Error: File not found :: ', new Date())
      throw createError({ statusCode: 404, message: 'File not found' })
    }
  }
})
