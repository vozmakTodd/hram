export const getYoutubeId = (val: string) => {
  return val.match(
    /(?:https?:)?(?:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/
  )
}
export const getRutubeId = (val: string) => {
  return val.match(/(?:https?:)?(?:\/\/)?rutube\.ru\/video\/([\w-]{32})/)
}
