import { v4 as uuidv4 } from 'uuid'
import fs from 'node:fs'
import type { IFileMongoModel } from '~/types/files'

export const saveImages = (images: Array<{ name: string; extension: string; file: number[] }>) => {
  const savedImages: IFileMongoModel[] = []

  images.forEach((image) => {
    const fileId = uuidv4()

    fs.writeFileSync(
      `public/news/${fileId}${image.extension}`,
      Buffer.from(new Uint8Array(image.file))
    )
    savedImages.push({ ...image, file: fileId })
  })

  return savedImages
}
