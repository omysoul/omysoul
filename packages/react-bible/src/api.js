// @flow

import { uncompress } from './util/compress-bible'
import { addBibleVersion } from './util/bible'

const versionsPromised = {}

export const loadVersion = (name: string) => {
  if (versionsPromised[name]) return versionsPromised[name]
  versionsPromised[name] = fetch(`//omysoul.github.io/bible/txt/${name}.txt`)
  .then(res => {
    if (res.status >= 400) {
      delete versionsPromised[name]
      throw new Error('Bad res from server')
    }
    return res.text()
  }).then(text => {
    const version = uncompress(text)
    addBibleVersion(name, version)
    return version
  })
  return versionsPromised[name]
}
