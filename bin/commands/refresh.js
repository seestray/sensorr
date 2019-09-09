const { from, of, EMPTY } = require('rxjs')
const { map, mapTo, tap, mergeMap, delay, pluck, catchError } = require('rxjs/operators')
const { Movie } = require('@shared/Documents')
const TMDB = require('@shared/services/TMDB')
const chalk = require('chalk')

async function refresh({ log, sensorr, db }) {
  const tmdb = new TMDB({ key: sensorr.config.tmdb, region: sensorr.config.region })
  log('')

  return await new Promise(resolve =>
    from(db.movies.allDocs({ include_docs: true })).pipe(
      pluck('rows'),
      map(entities => entities.map(entity => ({ id: entity.id, ...entity.doc }))),
      tap(movies => movies.length ? '' : log('🧐', `Oh. It seems your movies collection is empty.`)),
      map(movies => movies.sort((a, b) => a.time - b.time)),
      mergeMap(movies => from(movies)),
      mergeMap(movie => of(movie).pipe(
        mergeMap(movie => tmdb.fetch(['movie', movie.id], { append_to_response: 'credits,alternative_titles,release_dates' })),
        map(details => new Movie({ ...movie, ...details }, sensorr.config.region || 'en-US').normalize()),
        mergeMap(movie => from(db.movies.upsert(movie.id, (doc) => ({ ...doc, ...movie }))).pipe(mapTo(movie))),
        catchError(err => {
          log('🚨', err.toString())
          return EMPTY
        }),
        delay(2000),
      ), null, 1),
    ).subscribe(
      (movie) => log(
        '♻️ ',
        'Refreshing',
        `movie data ${chalk.inverse(movie.title)} ${chalk.gray(`(${movie.year})`)}`,
      ),
      (err) => log('🚨', err),
      () => {
        log('')
        resolve()
      },
    )
  )
}

module.exports = refresh
