import pepeplanet from '../pepeplanet.js';
import log from '../utils/log.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const PlayerDisconnect = ([login]) => {
  delete pepeplanet[login];
  log.white(`player ${login} disconnected`);
};

export default PlayerDisconnect;
