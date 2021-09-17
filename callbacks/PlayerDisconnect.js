import pepeplanet from '../pepeplanet.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const PlayerDisconnect = ([login]) => {
  delete pepeplanet[login];
  log.white(`player ${login} disconnected`);
};

export default PlayerDisconnect;
