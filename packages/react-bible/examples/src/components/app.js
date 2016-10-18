// @flow

import React from 'react'
import {
  BibleVerseListPane,
  BibleSearchPane,
  withQueryParams,
} from '../../../src'
import { compose, mapProps } from 'recompose'

const props = {
  versionName: 'kjv',
  rangesText: [
    'Ec 9:11',
    'Matt 23:24',
    '彼得前书 2:13,14',
  ].join('\n'),
}

const UrlBibleVerseListPane = compose(
  withQueryParams,
  mapProps(({ v, vn, ...rest }) => ({
    ...rest,
    rangesText: v,
    versionName: vn,
  }))
)(BibleVerseListPane)

function App() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.col}>
        <div style={styles.row2}>
          <div style={styles.colWrapper}>
            <UrlBibleVerseListPane {...props} />
          </div>
          <div style={styles.colWrapper}>
            <BibleSearchPane />
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
//    margin: -1,
  },
  row2: {
    display: 'flex',
    flex: 1,
  },
  col: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backround: 'blue',
  },
  colWrapper: {
//    paddingLeft: 20,
//    paddingRight: 20,
    overflow: 'auto',
    width: '50vw',
    background: 'white',
  },
}

export default App
