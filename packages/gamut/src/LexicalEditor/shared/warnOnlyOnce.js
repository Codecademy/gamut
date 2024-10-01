/* eslint-disable */

export default function warnOnlyOnce(message) {
  if (!__DEV__) {
    return
  }
  let run = false
  return () => {
    if (!run) {
      console.warn(message)
    }
    run = true
  }
}
