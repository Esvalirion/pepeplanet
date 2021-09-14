import fns from 'date-fns';

import log from '../utils/log.js';
import server from '../utils/server.js';
import config from '../config.js';

import generateUI from '../UI/generateUI.js';

import playerdb from '../db/players.js';
import recorddb from '../db/records.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const PlayerConnect = async ([login, isSpectator], client) => {
  try {
    const { Login, NickName, IPAddress } = await client.query('GetDetailedPlayerInfo', [login]);

    log.white(`Player ${NickName} connect ${isSpectator ? ' as spectator' : ''}`);

    const isPlayerExist = await playerdb.existPlayer(Login);

    if (!isPlayerExist) {
      await playerdb.upsertPlayer(Login, NickName, IPAddress);
    }

    if (config.admins.includes(Login)) {
      server.log(`$sWooow, admiral pepega $0f0${NickName}$g here!`);
    } else {
      server.log(`$sAnother pepega ${NickName}$g with us`);
    }

    generateUI(Login, client);

    const { UId } = client.query('GetCurrentMapInfo', []);
    const playerRecord = recorddb.getRecord(UId, Login);

    if (playerRecord) {
      server.private(Login, `Your pb on this map is $0f0${fns.format(playerRecord, 'mm:ss:SSS')}`);

      return;
    }

    server.private(Login, 'Your don\'t have pb on this map, pepega');
  } catch (err) {
    log.red('Something went wrong in PlayerConnect');
    log.red(err);
  }
};

export default PlayerConnect;
