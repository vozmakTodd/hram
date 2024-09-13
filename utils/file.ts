export const parseFileName = (name: string) => {
  const match = name.match(/([^/]+)(\.[^/.]+)$/)

  if (!match) {
    throw new Error('Wrong file name')
  }

  return { name: match[1], extension: match[2] }
}
