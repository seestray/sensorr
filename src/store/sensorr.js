import Sensorr from 'shared/Sensorr'

const sensorr = new Sensorr(global.config, {
  proxify: true,
  headers: {
    ...((global.config || { auth: {} }).auth.username ? {
      'Authorization': `Basic ${new Buffer(`${global.config.auth.username}:${global.config.auth.password}`).toString('base64')}`,
    } : {}),
  },
})

export default sensorr
