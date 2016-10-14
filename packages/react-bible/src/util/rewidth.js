export default delay => {
  let lastTime = Date.now() - delay
  let lastWidth
  let timer
  let reflowTimer
  let n = 0
  return (width, parentNode) => {
    let i = 0
    n++
    console.log(width, parentNode)
    if (!parentNode) return
    let currentNode = parentNode.firstChild
    clearTimeout(reflowTimer)
    const reflow = n2 => {
      const oldNode = currentNode
      currentNode = currentNode.nextSibling
      if (currentNode && n === n2) {
        reflowTimer = setTimeout(() => reflow(n2), delay)
      }
      if (!oldNode) return
      oldNode.style.width = `${width}px`
      console.log('reflow',i++,reflowTimer, n)
    }
    const now = Date.now()
    const delta = now - lastTime
    if (width !== lastWidth && delta >= delay) {
      lastTime = now
      reflow(n)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => reflow(n), delay)
    }
  }
}
