# 🍿📼 Sensorr

A simple movie release radar like CouchPotato, Radarr and Watcher3, written in Javascript with `React`

<!-- # Warning
🚨 This is early experimental, currently will only support [`Cardigann`](https://github.com/cardigann/cardigann) and [`Jackett`](https://github.com/Jackett/Jackett). -->

# Features
<table className="markdown-table">
  <tbody>
    <tr>
      <th>Screenshot</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/home.png?raw=true" width="100" />
      </td>
      <td>
        <b>Home</b>
        <ul>
          <li>Trending</li>
          <li>Discover (Popular)</li>
          <li>Discover (By year)</li>
          <li>Discover (By genre)</li>
          <li>Discover (By studio)</li>
          <li>Trending (stars)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/library.png?raw=true" width="100" />
      </td>
      <td>
        <b>Library</b>
        <ul>
          <li>Manage your movies <code>library</code> (<code>wished</code>, <code>pinned</code> and <code>archived</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/discover.png?raw=true" width="100" />
      </td>
      <td>
        <b>Discover</b>
        <ul>
          <li><code>Discover</code> movies with many options</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/movie.png?raw=true" width="100" />
      </td>
      <td>
        <b>Movie</b>
        <ul>
          <li>Display <code>movie</code> details</li>
          <li>Consider movie as, <code>🔕</code> <code>ignored</code>, <code>🍿</code> <code>wished</code>, <code>📍</code> <code>pinned</code> or <code>📼</code> <code>archived</code></li>
          <li>Find <code>releases</code> on <code>sources</code> (<code>torznab</code> / <code>newznab</code>) - requested with <code>title</code> (localized) and <code>original_title</code></li>
          <li>Grab a <code>release</code> (<code>manual</code> or <code>auto</code>)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/collection.png?raw=true" width="100" />
      </td>
      <td>
        <b>Collection</b>
        <ul>
          <li>Display <code>collection</code> details</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/calendar.png?raw=true" width="100" />
      </td>
      <td>
        <b>Calendar</b>
        <ul>
          <li>Track upcoming movies from <code>followed</code> stars !</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/following.png?raw=true" width="100" />
      </td>
      <td>
        <b>Following</b>
        <ul>
          <li>Manage stars you're <code>following</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/star.png?raw=true" width="100" />
      </td>
      <td>
        <b>Star</b>
        <ul>
          <li>Display <code>star</code> details</li>
          <li>Follow star <code>🔕</code> <code>ignored</code>, <code>🔔</code> <code>followed</code></li>
        </ul>
      </td>
    </tr>
    <!-- <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/configure.png?raw=true" width="100" />
      </td>
      <td>
        <b>Configure</b>
        <ul>
          <li>Simple configuration</li>
          <li>Secured WebUI (with <code>basic-auth</code>)</li>
          <li>Language aware, by default search on <a href="https://www.themoviedb.org/">TMDB</a> with first <code>window.navigator.languages</code></li>
          <li>Plex synchronization, never inadvertently download a movie you already own !</li>
        </ul>
      </td>
    </tr> -->
    <tr>
      <td>
      <img src="https://raw.githubusercontent.com/thcolin/sensorr/master/doc/screenshots/records.png?raw=true" width="100" />
      </td>
      <td>
        <b>Logs</b>
        <ul>
          <li>See <code>logs</code> details</li>
          <li>Every wished <code>movie</code> processed</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

# Scripts
  * `dev`: launch development server for `React` _frontend_
  * `server`: launch server services without serving _frontend_
  * `build`: build _frontend_ to `dist` folder
  * `prod`: run `pm2` apps, Sensorr (`web server`) and Sensorr (`record cron`)
  * `start`: launch `build` and `prod` scripts
  * `doc`: launch `docz` documentation server

# Docker
Checkout Sensorr [Docker image](https://hub.docker.com/r/thcolin/sensorr/), it let you skip every complex environment configuration and just run a clean installation, just open a terminal with `docker` installed and run:

```
# `/home/user/.sensorr` will be your config path
# `/home/user/downloads` will be your blackhole path
docker run -p 5070:5070 -v /home/user/.sensorr:/app/sensorr/config -v /home/user/downloads:/app/sensorr/blackhole --name="sensorr" thcolin/sensorr
```

Tips: Docker image is based on `alpine`, so you can add `TZ` env variable with `-e TZ=Europe/Paris`

# Configure
* Edit default configuration in `config/config.json` or `http://localhost:5070/configure`

# CLI
Currently CLI tool is mainly designed to work with `pm2` and `ecosystem.config.js` which launch `./bin/sensorr record -a` everyday at `17:00 / 5:00PM` and `./bin/sensorr stalk` everyday at `00:00`

**🚨 Warning:** CLI tool need to communicate with Sensorr web server at `http://localhost:5070` to sync databases ! Be sure Sensorr web server is launched before launching `record` command.

```

     _________  __________  ___  ___
    / __/ __/ |/ / __/ __ \/ _ \/ _ \
   _\ \/ _//    /\ \/ /_/ / , _/ , _/
  /___/___/_/|_/___/\____/_/|_/_/|_|


🍿 📼 - Movie release radar (CouchPotato, Radarr and Watcher3 alternative)

Usage: sensorr [command] [options]

Commands:
  📼 record              Record wished movies from collection with best release
  💧 hydrate             Hydrate movies from collection and stalked stars data
  📅 schedule            Schedule calendar with recents movies from stalked stars (+/- 2 years from now)
  🔗 pairwise            Pairwise Plex instance with Sensorr instance
  🗑️ clean               Clean oldest log sessions (if directory space exceeds configured value)

Options:
  -p, --port             Specify localhost <port> [default: 5070]
  -h, --help             Output usage information
  -v, --version          Output the version number
  # record
  -b, --blackhole <dir>  Download releases .torrent and .nzb to <dir> [default: /tmp]
  -f, --filter <regexp>  Filter releases returned by configured XZNAB
  -s, --sort <key>       Sort releases by <key> (among: seeders, peers or size) [default: seeders]
  -D, --descending       Sort releases in descending order


Tips: Sensorr will use your "config/config.js" and fallback on default
```

# Roadmap
* Fix `/discover` links on `Details` page (first results doesn't care about `initial` or something)
* Remove *query* `Input` on `Discover` page (useless)
* Refactor `Items`
  * Extract `database` and `TMDB` behaviors to `withDatabase` and `withTMDB` HOC
<!-- * Fix `palette` missing complete sometimes on `Film` in Firefox -->
* Record **Missing** `movies` too
* Feature `Discover`
  * `Movie`
    * Add link to `Collection`
  * `Star`
    * Add link to `Discover` with `with_credits=[actor]`
  * Improve `AND` + `OR` behavior
    * I want to see `Comédie` AND `Romance` movies
    * I want to see `Comédie` OR `Romance` movies
* Feature `Policies`
  * Add "groups" `Policy` with "default" === current (groups like `default` or `blockbuster` for example)
    * Add configurable `avoid` terms on `Movie` (like `/movie/515195` which got a `0.73` similarity score with `/movie/582607`)
    * Add configurable `prefer` terms on `Movie` (like `/movie/447404` I want in `FRENCH` and not `VOSTFR`)
  * Add `size` property on `Settings/blocks/Policy` (how to handle it ? `min/max` ?)
  * Improve `Documents.*.Filters`
    * `policies` - `multiple`
  * `Movie`
    * Add `policies`
      * `Checkbox` displayed as grid or column
        * After `Row` ? - Bad UX, far away from `state`
      * Create `policy` option (will copy/paste `default`)
      * Edit `policy` link
  * Add `List` page
    * Grouped movies by "policy"
    * Same layout as `Home` page
* Feature `Review` (fix manual)
  * Allow to *review* a `record` session
    * Review each `record`, one by one
    * Allow to post an `issue` on `thcolin/oleoo`
    * Allow to search for `releases`
    * Allow to **ban** `releases` (like a `release` with hardcoded `subtitles` downloaded that i don't want)
* Feature `performance`
  * Rename `XZNAB` to `XYZNAB`
  * On `Persona.State` `unfollow`, delete `calendar` entities with only `this` as followed credits
  * Look at [`shipjs`](https://github.com/algolia/shipjs)
  * `oleoo`
    * Refactor algorithm, split `title` and `metadata` with `year|language|resolution|source` (`[0]`/`[1]`)
  * `Server`
    * Look at [`WatermelonDB`](https://github.com/Nozbe/WatermelonDB)
    * Fix RAM usage with `sessions` in `io`
  * `CLI`
    * Use [`cli-step`](https://github.com/poppinss/cli-step)
    * When `stalk` star, `atomicUpsert` it
    * Fix `record` command, filter movies with release date < +3 months (useless to search for movies still in production - make configurable)
  * Responsive design / mobile UI-UX
    * Take `screenshots` in `small`, `medium` and `large` breakpoints
* Feature `Config`
  * Refactor `config` to `settings` using [mozilla/node-convict](https://github.com/mozilla/node-convict)
* Feature `1.0.0`
  * 🎉
  * Fix `docz`
  * Improve `README`
* Feature `Notifications`
  * Notify `records` summary (email, sms, etc...)
* Feature `UI/UX sugar`
  * Translate (`fr`, `en`)
  * `Discover`
    * Add `status` in `controls` - how ?
    * Add `Random` button
  * `Search`
    * Animate `height`
    * Remove `suggestions`
  * `Home`
    * Add `Head` `Film` ? (see [inspiration](https://dribbble.com/shots/2813716-BookMyShow-Movies-Concept))
    * Add "pre-configured" `List` like `Oscars` ?
  * `Settings`
    * `Database`
      * Allow to `clean` browser `sensorr-*` databases (`doctor`)
  * `Grid`
    * Select/Deselect all
  * `Row`
    * Load next page when scroll end on `Row` with `uri` props (like `Grid` but horizontal)
      * Better, display `Grid` when scroll end + `entities.length > 10`
  * Summary command result
    * `record`:
      ```
        ${found} Movies archived to ${sensorr.config.blackhole} ! 🎉
          * ${movie.title} (${movie.year}) with release ${release.generated}
        But ${notfound} still not found.. 😶
          * ${movie.title} (${movie.year}) : 0 releases found including 0 filtered
      ```
  * `Loading` page waiting sync of `db` with progress ?
    * Allow to `clean` database if waiting too much
  * Dark mode (`react-theme-provider`)
* Feature `Custom Home`
  * `Home`
    * Customize
      * Pinned sortable `Trending|Discover` `Rows`
        * `type=[Popular|Top|Calendar|Trending|Discover]`
        * `uri={...}`
        * `params={...}`
      * Save from `Discover` "current" params
* Feature `Doctor`
  * Replace `Plex` releases by better if available, like `CouchPotato`
    * `Plex` manage all `medias`, so we can get `release` (`source`, `language`, `resolution`, ...) and compute score
* Feature `Onboarding`
  * Add `Onboarding` page
* Feature `Browser Plugin`
  * `IMDB`, `TMDB`, `SensCritique` or `AlloCiné` browser plugin "bookmark" (update state of current movie website tab on `Sensorr` instance)
* Feature `import/export`
  * Synchronize with `trakt.tv`
* Feature `Mobile` app
  * Connect to server with QR code
  * Streaming from `Releases` (how to know which file read ? - ask user)

# Inspiration
* CLI
  * [minimist](https://github.com/substack/minimist)
  * [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
  * [commander.js](https://github.com/tj/commander.js)
  * [oclif](https://github.com/oclif/oclif)
  * [ink](https://github.com/vadimdemedes/ink)

# Family
* [CouchPotato](https://github.com/CouchPotato/CouchPotatoServer)
* [Radarr](https://github.com/Radarr/Radarr)
* [Watcher3](https://github.com/nosmokingbandit/Watcher3)
