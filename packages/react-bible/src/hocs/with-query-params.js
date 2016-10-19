import React from 'react'
import querystring from 'querystring'
import {
  compressRangesText,
  uncompressRangesText
} from '../util/bible'

const withQueryParams = Component => props => {
  const { v, vr, vn } = querystring.parse(window.location.search.substr(1))
  const query = {
    rangesText: vr || (v && uncompressRangesText(v)),
    ...(vn ? { versionName: vn } : {}),
    onChange: (value) => {
      const v = compressRangesText(value.rangesText)
      const qs = `?v=${v}&vn=${value.versionName}`
      window.history && window.history.pushState(null, null, qs)
    }
  }

  return <Component {...props} {...query} />
}

export default withQueryParams
