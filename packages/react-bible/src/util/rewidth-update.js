export default (fn, delay) => {
  let lastTime = Date.now() - delay
  let lastWidth
  let timer
  let n = 0
  return (width) => {
    const now = Date.now()
    const delta = now - lastTime
    if (width !== lastWidth && delta >= delay) {
      lastTime = now
      fn()
    } else {
      clearTimeout(timer)
      timer = setTimeout(fn, delay)
    }
  }
}
