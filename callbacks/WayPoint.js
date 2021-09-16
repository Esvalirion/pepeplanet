import server from '../utils/server.js';
import log from '../utils/log.js';
import raceTime from '../utils/raceTime.js';

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
let nickName = null;
let login = null;
let wayPoints = [];

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

    if (params.checkpointinrace === 0) {
      wayPoints = [];
    }

    // TODO: for laps
    if (!params.isendrace) {
      const oldTime = recordData.cps[params.checkpointinrace]?.time;

      wayPoints.push({
        map: recordData.UId,
        cp: params.checkpointinrace,
        time: Math.min(params.racetime, oldTime || params.racetime),
        login,
      });

      // pepega new time
      if (oldTime && params.racetime > oldTime) {
        server.private(`cp${params.checkpointinrace} ${raceTime(params.racetime)} (+${raceTime(params.racetime - oldTime)})`, login);
        return;
      }

      if (oldTime) {
        // nice new time (date-fns can't format negative times)
        server.private(`cp${params.checkpointinrace} ${raceTime(params.racetime)} (${raceTime(oldTime - params.racetime)})`, login);
      }

      // new time
      server.private(`cp${params.checkpointinrace} ${raceTime(params.racetime)}`, login);

      return;
    }

    const timeString = raceTime(params.racetime);

    // TODO: only when finish
    await checkpointdb.upsertCheckpoint({
      map: recordData.UId,
      cp: params.checkpointinrace,
      time: params.racetime,
      login,
    });

    // new pog time
    if (params.racetime < recordData.record || recordData.record === 0) {
      await Promise.all(wayPoints.map(async (cpItem) => {
        await checkpointdb.upsertCheckpoint(cpItem);
      }));

      await recorddb.upsertRecord({
        map: recordData.UId,
        time: params.time,
        login,
      });

      server.log(`pepega $0f0${recordData.nickName}$g gain self pb $0f0${timeString}`);
    }

    wayPoints = [];
    recordData = null;
  } catch (err) {
    log.red('Something went wrong in WayPoint');
    log.red(err);
  }
};

export default WayPoint;
