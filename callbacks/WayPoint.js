import server from '../utils/server.js';
import log from '../utils/log.js';
import raceTime from '../utils/raceTime.js';

import recorddb from '../db/records.js';
import checkpointdb from '../db/checkpoints.js';

import generateUI from '../UI/generateUI.js';

import pepeplanet from '../pepeplanet.js';

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

const setData = async (params, client) => {
  const { UId } = await client.query('GetCurrentMapInfo', []);

  const record = await recorddb.getRecord(UId, params.login);
  const cps = await checkpointdb.getListOfPersonalBestCheckpointsOnMap(UId, params.login);

  return {
    record: record?.time ?? 0,
    cps: cps.length ? cps : [],
    UId,
  };
};

const WayPoint = async (params, client) => {
  const {
    login,
    checkpointinrace,
    isendrace,
    racetime,
  } = params;

  const { players } = pepeplanet;

  try {
    if (!players[login].recordData) {
      players[login].recordData = await setData(params, client);
    }

    const {
      recordData,
      wayPoints,
      nickName,
    } = players[login];

    // TODO: for laps
    if (!isendrace) {
      const oldTime = recordData.cps[checkpointinrace]?.time;

      wayPoints.push({
        map: recordData.UId,
        login,
        cp: checkpointinrace,
        time: racetime,
        oldTime,
      });

      generateUI(login, client);

      // pepega new time
      if (oldTime && racetime > oldTime) {
        server.private(`cp-$0f0${checkpointinrace}$g ${raceTime(racetime)} ($f30+${raceTime(racetime - oldTime)}$g)`, login);
        return;
      }

      if (oldTime) {
        // nice new time (date-fns can't format negative times)
        server.private(`cp-$0f0${checkpointinrace}$g ${raceTime(racetime)} ($33f-${raceTime(oldTime - racetime)}$g)`, login);
        return;
      }

      // new time
      server.private(`cp-$0f0${checkpointinrace}$g ${raceTime(racetime)}`, login);

      return;
    }

    // new pog time
    if (racetime < recordData.record || recordData.record === 0) {
      await Promise.all(wayPoints.map(async (cpItem) => {
        await checkpointdb.upsertCheckpoint(cpItem);
      }));

      await recorddb.upsertRecord({
        map: recordData.UId,
        time: racetime,
        login,
      });

      if (recordData.record === 0) {
        server.log(`$ff0🔥$g pepega $0f0${nickName}$g gained self pb $0f0${raceTime(racetime)}$g ($33f-${raceTime(recordData.record - racetime)}$g)`);
      } else {
        server.log(`$ff0🔥$g pepega $0f0${nickName}$g gained new run $0f0${raceTime(racetime)}$g`);
      }
    } else {
      server.private(`$f30💢$g pepega lol! $0f0${raceTime(racetime)}$g ($f30+${raceTime(racetime - recordData.record)}$g)`, login);
    }

    players[login].wayPoints = [];
    players[login].recordData = null;

    generateUI(login, client);
  } catch (err) {
    log.red('Something went wrong in WayPoint');
    log.red(err);
  }
};

export default WayPoint;
