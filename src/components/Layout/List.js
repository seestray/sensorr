import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { useHover } from 'react-hooks-lib'
import Empty from 'components/Empty'
import Spinner from 'components/Spinner'
import tmdb from 'store/tmdb'
import nanobounce from 'nanobounce'
import theme from 'theme'

const styles = {
  list: {
    element: {
      position: 'relative',
      padding: '2em 0',
    },
    label: {
      padding: '0 2em',
      margin: 0,
      fontSize: '2em',
      fontWeight: 'bold',
      color: theme.colors.black,
    },
    container: {
      left: 0,
      display: 'flex',
      flexWrap: 'nowrap',
    },
    row: {
      flexDirection: 'row',
      overflowX: 'auto',
      overflowY: 'hidden',
    },
    column: {
      flexDirection: 'column',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    entity: {
      flex: '0 0 auto',
    },
  },
  label: {
    element: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      'select': {
        position: 'absolute',
        opacity: 0,
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        appearance: 'none',
        border: 'none',
        cursor: 'pointer',
        zIndex: 1,
      },
    },
  },
}

export default class List extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
    child: PropTypes.elementType.isRequired,
    uri: PropTypes.array,
    params: PropTypes.object,
    transform: PropTypes.func,
    filter: PropTypes.func,
    label: PropTypes.node,
    display: PropTypes.oneOf(['row', 'column']),
    space: PropTypes.number,
    empty: PropTypes.object,
    spinner: PropTypes.object,
    strict: PropTypes.bool,
    hide: PropTypes.bool,
    prettify: PropTypes.number,
  }

  static defaultProps = {
    items: [],
    uri: [],
    params: {},
    transform: (res) => res.results,
    filter: () => true,
    display: 'row',
    space: 2,
    empty: {},
    spinner: {},
    strict: true,
    hide: false,
    prettify: 0,
  }

  constructor(props) {
    super(props)

    this.state = {
      entities: [],
      loading: false,
      err: null,
    }

    this.validate = this.validate.bind(this)

    this.reference = React.createRef()
    this.debounce = nanobounce(700)
  }

  componentDidMount() {
    if (this.props.uri.length) {
      this.setState({ loading: true })
      tmdb.fetch(this.props.uri, this.props.params).then(
        res => this.debounce(() => {
          this.setState({ loading: false, entities: this.props.transform(res) || [] })
        }),
        err => this.debounce(() => {
          this.setState({
            loading: false,
            err: (err.status_code === 7 ? 'Invalid TMDB API key, check your configuration.' : err.status_message),
          })
        })
      )
    }
  }

  componentDidUpdate(props) {
    if (this.props.uri.length) {
      if (this.props.uri.join('/') !== props.uri.join('/') || JSON.stringify(this.props.params) !== JSON.stringify(props.params)) {
        this.setState({ entities: Array(this.state.entities.length).fill({ poster_path: false, profile_path: false }) })
        tmdb.fetch(this.props.uri, this.props.params).then(
          res => this.debounce(() => {
            this.setState({ loading: false, entities: this.props.transform(res) })
            this.reference.current && this.reference.current.scroll(0, 0)
          }),
          err => this.debounce(() => {
            this.setState({
              loading: false,
              err: (err.status_code === 7 ? 'Invalid TMDB API key, check your configuration.' : err.status_message),
            })
          })
        )
      }
    }

    if (this.props.items.length && (this.props.items[0] || {}).id !== (props.items[0] || {}).id) {
      this.reference.current && this.reference.current.scroll(0, 0)
    }
  }

  validate(entity) {
    return (
      (!this.props.strict || typeof entity.poster_path !== 'undefined' || typeof entity.profile_path !== 'undefined') &&
      (!entity.adult || tmdb.adult)
    )
  }

  render() {
    const { items, uri, params, child, transform, filter, label, display, space, empty, spinner, strict, hide, prettify, ...props } = this.props
    const { entities, loading, err, ...state } = this.state

    const filtered = [...items, ...entities]
      .filter(entity => this.validate(entity))
      .filter(filter)

    return (!!filtered.length || !hide) && (
      <div css={styles.list.element}>
        {!!label && (
          <h1 {...props} css={[styles.list.label, props.css]}>{label}</h1>
        )}
        <div css={[styles.list.container, styles.list[display]]} ref={this.reference}>
          {loading ? (
            <Spinner {...spinner} />
          ) : filtered.length ? (
            filtered.map((entity, index) => (
              <div key={index} css={styles.list.entity} style={{ padding: `${space}em` }}>
                {React.createElement(child, { entity: entity, display: (index < prettify ? 'pretty' : 'default' ) })}
              </div>
            ))
          ) : (
            <Empty
              {...empty}
              title={err ? 'Oh ! You came across a bug...' : empty.title}
              emoji={err ? '🐛' : empty.emoji}
              subtitle={err ? err : empty.subtitle}
            />
          )}
        </div>
      </div>
    )
  }
}

export const Label = ({ id, title, compact, actions, value, onChange, options, children }) => {
  const { hovered, bind } = useHover()

  return (
    <span {...bind} css={styles.label.element} style={{ justifyContent: { true: 'flex-start', false: 'space-between' }[compact] }}>
      <label htmlFor={id} {...(title ? { title } : {})} style={{ position: 'relative' }}>
        {children}
        {!!(options || []).length && (
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map(option => (
              <option key={option.label} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}
      </label>
      {actions && (
        <>
          {compact && <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>}
          <span hidden={!compact && !hovered}>{actions}</span>
        </>
      )}
    </span>
  )
}

Label.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  compact: PropTypes.bool,
  actions: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  children: PropTypes.node.isRequired,
}

Label.defaultProps = {
  compact: false,
}