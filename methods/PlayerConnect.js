import log from '../utils/log.js';
import server from '../utils/server.js';
import config from '../config.js';

import generateUI from '../UI/generateUI.js';

const getDateString = () => {
  const timeNow = new Date();

  const dateString = `${timeNow.getDate()}.${timeNow.getMonth()}.${timeNow.getFullYear()}`;
  const timeString = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`;

  return {
    dateString,
    timeString,
  };
};

const PlayerConnect = async ([login, isSpectator], client) => {
  try {
    const { Login, NickName, IPAddress } = await client.query('GetDetailedPlayerInfo', [login]);

    const { dateString, timeString } = getDateString();

    log.white(`
      ${dateString} at ${timeString}

      nick: ${NickName}
      login: ${Login}
      ip: ${IPAddress}

      Player connect${isSpectator ? ' as spectator' : ''}
      ----------
    `);

    if (config.admins.includes(Login)) {
      server.log(`$sWooow, admiral pepega $0f0${NickName}$g here!`);
    } else {
      server.log(`$sAnother pepega ${NickName}$g with us`);
    }

    generateUI(Login, client);
  } catch (err) {
    log.red('Something went wrong in PlayerConnect');
    log.red(err);
  }
};

export default PlayerConnect;
