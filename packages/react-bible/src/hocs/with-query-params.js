import React from 'react'
import querystring from 'querystring'

const withQueryParams = Component => props => {
  const query = querystring.parse(window.location.search.substr(1))
  return <Component {...props} {...query} />
}

export default withQueryParams
