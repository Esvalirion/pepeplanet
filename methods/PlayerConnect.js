import log from '../utils/log.js';
import server from '../utils/server.js';
import config from '../config.js';

const getDateString = () => {
  const timeNow = new Date();

  const dateString = `${timeNow.getDate()}.${timeNow.getMonth()}.${timeNow.getFullYear()}`;
  const timeString = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`;

  return {
    dateString,
    timeString,
  }
}

const PlayerConnect = async ([ login, isSpectator ], client) => {
  try {
    const {  Login, NickName, IPAddress } = await client.query('GetDetailedPlayerInfo', [login]);

    const { dateString, timeString } = getDateString();

    log.white(`
      ${dateString} at ${timeString}

      nick: ${NickName}
      login: ${Login}
      ip: ${IPAddress}

      Player connect${isSpectator ? ' as spectator' : ''}
      ----------
    `)

    if (config.admins.includes(Login)) {
      server.log(`Wooow, admiral pepega ${NickName} here!`);
    } else {
      server.log(`Another pepega ${NickName} with us`);
    }
  } catch {
    log.red('Something went wrong in PlayerConnect');
  }
};

export default PlayerConnect;