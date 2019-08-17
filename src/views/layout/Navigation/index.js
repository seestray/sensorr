import React, { useContext } from 'react'
import { withRouter, Switch, NavLink, Route } from 'react-router-dom'
import { triggerScrollTop } from 'views/enhancers/ScrollTop'
import { Sticky } from 'react-sticky'
import Search from 'views/layout/Search'
import Recording from './containers/Recording'
import * as Library from 'views/pages/Library'
import * as Upcoming from 'views/pages/Upcoming'
import * as Following from 'views/pages/Following'
import * as Records from 'views/pages/Records'
import qs from 'query-string'
import theme from 'theme'

const styles = {
  element: {
    top: '-1px',
    zIndex: 3,
    fontSize: '1em',
    transition: 'font-size 50ms ease',
  },
  stuck: {
    fontSize: '0.75em',
    transition: 'font-size 200ms ease 100ms',
  },
  container: {
    position: 'relative',
  },
  primary: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    padding: '2em 0 2.25em',
    zIndex: 4,
  },
  secondary: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    padding: '1.125em 0 1.375em',
    zIndex: 0,
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  link: {
    color: theme.colors.white,
    margin: '0 2em -0.375em',
    fontWeight: 800,
    textTransform: 'uppercase',
    textDecoration: 'none',
    paddingBottom: '0.25em',
    borderBottom: `0.125em inset`,
    borderBottomColor: theme.colors.secondary,
  },
  light: {
    fontSize: '0.875em',
    fontWeight: 600,
    paddingBottom: '0.25em',
    borderBottomColor: theme.colors.primary,
  },
  active: {
    borderBottomColor: theme.colors.white,
  },
  emojis: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'flex-end',
    padding: '0 1em',
    fontSize: '2em',
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  search: {
    position: 'absolute',
    width: '100%',
    right: 0,
    bottom: 0,
    zIndex: 3,
    transition: `transform 500ms ease`,
    transform: 'translateY(0)',
  },
  toggled: {
    transform: 'translateY(100%)',
  },
  icons: {
    scrolltop: {
      cursor: 'pointer',
      textDecoration: 'none',
      padding: '0.25em 0 0',
    },
    search: {
      margin: '0 1em',
      textDecoration: 'none',
    },
    configure: {
      margin: '0 1em 0 0',
      textDecoration: 'none',
    },
  },
}

const Navigation = withRouter(({ location, history, match, staticContext, ...props }) => {
  const { query } = qs.parse(location.search)
  const { toggled } = useContext(Search.Contexts.toggled)

  return (
    <Sticky>
      {({ style, isSticky }) => (
        <nav style={{ ...style, ...styles.element, ...(isSticky ? styles.stuck : {}) }}>
          <div style={styles.container}>
            <div style={{ ...styles.search, ...(toggled ? styles.toggled : {}) }}>
              <Search.Input />
            </div>
            <div style={styles.primary}>
              <div style={{ ...styles.emojis, ...styles.left }}>
                <a onClick={() => triggerScrollTop()} style={styles.icons.scrolltop} title="Scroll Top" hidden={!isSticky}>⏫</a>
              </div>
              <div style={styles.menu}>
                <NavLink to="/" exact={true} style={styles.link} activeStyle={styles.active}>Trending</NavLink>
                <NavLink to="/movies" style={styles.link} activeStyle={styles.active}>Movies</NavLink>
                <NavLink to="/stars" style={styles.link} activeStyle={styles.active}>Stars</NavLink>
              </div>
              <div style={{ ...styles.emojis, ...styles.right }}>
                <Search.Icon style={styles.icons.search} />
                <NavLink to="/configure" exact={true} style={styles.icons.configure} title="Configure">🎚</NavLink>
                <Recording />
              </div>
            </div>
          </div>
          <Switch>
            <Route
              path="/movies"
              render={() => (
                <div css={styles.secondary}>
                  <NavLink to="/movies/library" exact={true} style={{ ...styles.link, ...styles.light }} activeStyle={styles.active}>Library</NavLink>
                  <NavLink to="/movies/upcoming" style={{ ...styles.link, ...styles.light }} activeStyle={styles.active}>Upcoming</NavLink>
                  <NavLink to="/movies/records" style={{ ...styles.link, ...styles.light }} activeStyle={styles.active}>Records</NavLink>
                </div>
              )}
            />
            <Route
              path="/stars"
              render={() => (
                <div css={styles.secondary}>
                  <NavLink to="/stars/following" exact={true} style={{ ...styles.link, ...styles.light }} activeStyle={styles.active}>Following</NavLink>
                </div>
              )}
            />
            <Route
              path="/configure"
              render={() => (
                <div css={styles.secondary}>
                  <NavLink to="/configure" exact={true} style={{ ...styles.link, ...styles.light }} activeStyle={styles.active}>General</NavLink>
                  <NavLink to="/configure/downloads" exact={true} style={{ ...styles.link, ...styles.light }} activeStyle={styles.active}>Downloads</NavLink>
                  <NavLink to="/configure/plex" exact={true} style={{ ...styles.link, ...styles.light }} activeStyle={styles.active}>Plex</NavLink>
                  <NavLink to="/configure/database" exact={true} style={{ ...styles.link, ...styles.light }} activeStyle={styles.active}>Database</NavLink>
                </div>
              )}
            />
            {/* TODO: Ugly as fuck, should be refactored */}
            <Route
              render={() => !!query && (
                <div css={{ ...styles.secondary, visibility: 'hidden' }}>
                  <a style={{ ...styles.link, ...styles.light }}>&nbsp;</a>
                </div>
              )}
            />
          </Switch>
          {!query && (
            <Switch>
              <Route path="/movies/library" exact component={Library.Navigation} />
              <Route path="/movies/upcoming/:year/:month" exact component={Upcoming.Navigation} />
              <Route path="/movies/records/:uuid?" exact component={Records.Navigation} />
              <Route path="/stars/following" exact component={Following.Navigation} />
            </Switch>
          )}
        </nav>
      )}
    </Sticky>
  )
})

export default Navigation
