export interface IFileModel {
  id: number
  name: string
  extension: string
  file: Uint8Array | null
}
