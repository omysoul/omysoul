export default (fn, delay) => {
  let lastTime = Date.now() - delay
  let lastWidth
  let timer
  let n = 0
  return (width) => {
    if (width !== lastWidth && delta >= delay) {
      lastTime = now
      fn()
    } else {
      clearTimeout(timer)
      timer = setTimeout(fn, delay)
    }
  }
}
