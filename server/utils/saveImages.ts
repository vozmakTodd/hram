import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import type { IFileMongoModel } from '~/types/files'

export const saveImages = async (
  images: Array<{ name: string; extension: string; file: number[] }>
) => {
  const savedImages: IFileMongoModel[] = []

  for (const image of images) {
    const fileId = uuidv4()

    if (!fs.existsSync('server/uploads')) {
      fs.mkdirSync('server/uploads')
    }

    await fs.promises.writeFile(
      `server/uploads/${fileId}${image.extension}`,
      Buffer.from(new Uint8Array(image.file))
    )

    savedImages.push({ ...image, file: fileId })
  }

  return savedImages
}
