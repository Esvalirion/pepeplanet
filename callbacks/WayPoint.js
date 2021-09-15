import fns from 'date-fns';
import server from '../utils/server.js';
import log from '../utils/log.js';

import recorddb from '../db/records.js';
import checkpointdb from '../db/checkpoints.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 * @param {number} time
 * @param {string} login
 * @param {string} accountid
 * @param {number} racetime
 * @param {number} laptime
 * @param {number} checkpointinrace
 * @param {number} checkpointinlap
 * @param {boolean} isendrace
 * @param {boolean} isendlap
 * @param {boolean} isinfinitelaps
 * @param {boolean} isindependentlaps
 * @param {array} curracecheckpoints
 * @param {array} curlapcheckpoints
 * @param {string} blockid
 * @param {number} speed
 */

let recordData = null;

const setData = async (params, client) => {
  const { UId } = await client.query('GetCurrentMapInfo', []);

  const record = await recorddb.getRecord(UId, login);
  const cps = await checkpointdb.getListOfPersonalBestCheckpointsOnMap(UId, login);

  return {
    record: record || 0,
    cps,
    UId,
  };
};

let nickName = null;
let login = null;

const WayPoint = async (params, client) => {
  try {
    if (!nickName || !login) {
      const { NickName, Login } = await client.query('GetDetailedPlayerInfo', [params.login]);
      nickName = NickName;
      login = Login;
    }

    if (!recordData) {
      recordData = await setData(params, client);
    }

    const timeString = fns.format(params.racetime, 'mm:ss:SSS');

    // TODO: for laps
    if (!params.isendrace) {
      const oldTime = recordData.cps[params.checkpointinrace]?.time;

      if (oldTime && params.racetime > oldTime) return;
      // TODO: only when finish
      await checkpointdb.upsertCheckpoint({
        map: recordData.UId,
        login: login,
        cp: params.checkpointinrace,
        time: params.racetime,
      });

      if (oldTime) {
        server.private(`${fns.format(params.racetime, 'mm:ss:SSS')} (-${fns.format(oldTime - params.racetime, 'mm:ss:SSS')})`, login);
      }

      recordData = null;

      return;
    }

    // if (params.racetime < recordData.record || recordData.record <= 1) {
    //   await recorddb.upsertRecord({
    //     map: recordData.UId,
    //     login: login,
    //     time: params.time,
    //   });

    //   server.log(`pepega $0f0${recordData.nickName}$g gain self pb $0f0${timeString}`);

    //   recordData = null;
    // }
  } catch (err) {
    log.red('Something went wrong in WayPoint');
    log.red(err);
  }
};

export default WayPoint;
