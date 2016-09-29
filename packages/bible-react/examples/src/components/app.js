// @flow

import React from 'react'
import {
  BibleVerseListPane,
  BibleSearchPane,
} from '../../../src'

function App() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.col}>
        <div style={styles.row2}>
          <BibleVerseListPane />
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
    margin: -1,
  },
  row1: {
    display: 'flex',
    background: 'white',
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
    flex: 1,
    background: 'white',
  },
}

export default App
