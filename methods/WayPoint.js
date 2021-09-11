import fns from 'date-fns';
import server from '../utils/server.js';
import log from '../utils/log.js';

/**
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

const WayPoint = async (params, client) => {
  try {
    const { NickName } = await client.query('GetDetailedPlayerInfo', [params.login]);

    const timeString = fns.format(params.racetime, 'mm:ss:SSS');

    if (!params.isendlap) return;

    server.log(`pepega $0f0${NickName}$g finishes in $0f0${timeString}`);
  } catch (err) {
    log.red('Something went wrong in PlayerConnect');
    log.red(err);
  }
};

export default WayPoint;
