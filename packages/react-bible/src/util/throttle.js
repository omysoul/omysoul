export default (fn, threshhold = 250) => {
  let last
  let deferTimer

  return (...args) => {
    const now = Date.now()
    if (last && now < last + threshhold) {
      console.log('if')
      clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        last = now
        fn(...args)
      }, threshhold)
    } else {
      console.log('else')
      last = now
      fn(...args)
    }
  }
}
