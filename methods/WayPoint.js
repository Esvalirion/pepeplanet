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

    const ms = fns.format(params.racetime, 'SSS');
    const secs = fns.format(params.racetime, 'ss');
    const mins = fns.format(params.racetime, 'mm');

    const timeString = `${mins}:${secs}:${ms}`

    if (params.isendlap) {
      server.log(`$o$0f0${NickName}$g finishes in $o$0f0${timeString}`);
      return;
    }

    server.log(`$o$0f0${NickName}$g pass $o$0f0${params.checkpointinrace}$g checkpoint in $o$0f0${timeString}`);
  } catch (err) {
    log.red('Something went wrong in PlayerConnect');
    log.red(err);
  }
};

export default WayPoint;
