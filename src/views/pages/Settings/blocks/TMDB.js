import React from 'react'
import { styles } from '../index.js'

const placeholder = {
  tmdb: 'TMDB API Key (v3 auth)',
}

const TMDB = ({ values, handleChange, ...props }) => (
  <div style={styles.section}>
    <h1 style={styles.title}>TMDB</h1>
    <p style={styles.paragraph}>
      Sensorr is powered by <a href="https://www.themoviedb.org/" style={styles.link}>The Movie Database</a> API, to works properly, you need to fill <a href="https://www.themoviedb.org/settings/api" style={styles.link}>your own API Key (v3 auth)</a>.
      <br/>
      <br/>
      Specify <code style={styles.code}>API Key</code> (v3 auth) :
    </p>
    <div style={styles.column}>
      <input
        type="text"
        placeholder={placeholder.tmdb}
        style={styles.input}
        defaultValue={values.tmdb}
        onChange={e => handleChange('tmdb', e.target.value)}
      />
      {/* <label htmlFor="adult" style={{ ...styles.input, borderColor: 'transparent' }}>
        <input
          id="adult"
          type="checkbox"
          defaultChecked={values.adult}
          onChange={e => handleChange('adult', e.target.checked)}
          style={{ marginRight: '1em', }}
        />
        Allow adult content ? 🍑
      </label> */}
    </div>
  </div>
)

export default TMDB
