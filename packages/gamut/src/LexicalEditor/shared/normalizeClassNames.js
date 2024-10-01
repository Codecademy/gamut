/* eslint-disable */

export default function normalizeClassNames(...classNames) {
  const rval = []
  for (const className of classNames) {
    if (className && typeof className === 'string') {
      for (const [s] of className.matchAll(/\S+/g)) {
        rval.push(s)
      }
    }
  }
  return rval
}
