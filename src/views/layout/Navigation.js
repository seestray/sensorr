import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { withToastManager } from 'react-toast-notifications'
import { Link } from 'react-router-dom'
import sensorr from 'store/sensorr'
import theme from 'theme'

const animations = {
  bounce: {
    '0%': {
      transform: 'translateY(-0.0625em)'
    },
    '50%': {
      transform: 'translateY(0.25em)'
    },
    '100%': {
      transform: 'translateY(-0.0625em)'
    },
  }
}

const suits = StyleSheet.create({
  bounce: {
    animationName: animations.bounce,
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  }
})

const styles = {
  element: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    padding: '2em 0',
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  link: {
    color: theme.colors.white,
    margin: '0 2em',
    fontWeight: 800,
    textTransform: 'uppercase',
    textDecoration: 'none',
    paddingBottom: '0.35em'
  },
  active: {
    borderBottom: `0.1em solid ${theme.colors.white}`,
    paddingBottom: '0.25em'
  },
  emojis: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'flex-end',
    padding: '0 1em',
    fontSize: '2em',
  },
  configure: {
    margin: '0 1em',
    textDecoration: 'none',
  },
  logs: {
    margin: '0 1em 0 0',
    textDecoration: 'none',
  },
  trigger: {
    cursor: 'pointer',
    textDecoration: 'none',
  },
}

class Navigation extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      status: {},
    }

    this.pingStatus = this.pingStatus.bind(this)
    this.triggerJob = this.triggerJob.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(() => this.pingStatus(), 2000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  pingStatus() {
    fetch('/api/status', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${new Buffer(`${sensorr.config.auth.username}:${sensorr.config.auth.password}`).toString('base64')}`,
      }),
    })
    .then(res => {
      try {
        res.json().then(body => {
          if (res.ok) {
            this.setState({ status: body.status })
          } else {
            console.warn(`Unexpected error during ping status : ${res.statusText}`)
          }
        })
      } catch(e) {
        console.warn(`Unexpected error during ping status : ${res.statusText}`)
      }
    })
  }

  triggerJob(type) {
    const { toastManager } = this.props

    fetch('/api/trigger', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${new Buffer(`${sensorr.config.auth.username}:${sensorr.config.auth.password}`).toString('base64')}`,
      }),
      body: JSON.stringify({ type })
    })
    .then(res => {
      try {
        res.json().then(body => {
          if (res.ok) {
            toastManager.add({
              record: <span><strong>Record</strong> job triggered ! See <strong>Logs</strong> page to follow progress !</span>,
            }[type], { appearance: 'success', autoDismiss: true, })

            this.setState(state => ({ status: { ...status, record: true } }))
          } else {
            toastManager.add({
              record: <span><strong>Record</strong> job already in progress</span>,
            }[type], { appearance: 'error', autoDismiss: true, })
          }
        })
      } catch(e) {
        toastManager.add((
          <span>Unexpected error during job trigger : <strong>{res.statusText}</strong></span>
        ), { appearance: 'error', autoDismiss: true, })
      }
    })
  }

  render() {
    const { toastManager, ...props} = this.props
    const { status, ...state} = this.state

    return (
      <div style={styles.element}>
        <div style={styles.menu}>
          <Link to="/"
            style={{...styles.link, ...window.location.pathname.match(/^\/$/) ? styles.active : {}}}
          >
            Trending
          </Link>
          <Link to="/collection"
            style={{...styles.link, ...window.location.pathname.match(/^\/collection$/) ? styles.active : {}}}
          >
            Collection
          </Link>
          <Link to="/search/movie"
            style={{...styles.link, ...window.location.pathname.match(/^\/search/) ? styles.active : {}}}
          >
            Search
          </Link>
        </div>
        <div style={styles.emojis}>
          <Link to="/configure" style={styles.configure} title="Configure">🎚</Link>
          <Link to="/logs" style={styles.logs} title="History">📖</Link>
          <div
            className={status.record ? css(suits.bounce) : ''}
            style={styles.trigger}
            title={'Trigger "Record" job'}
            onClick={() => this.triggerJob('record')}
          >
            🚀
          </div>
        </div>
      </div>
    )
  }
}

export default withToastManager(Navigation)
