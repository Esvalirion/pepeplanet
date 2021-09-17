import pepeplanet from '../pepeplanet.js';
import log from '../utils/log.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const EndMap = async (_, client) => {
  Object.keys(pepeplanet.players).forEach((key) => {
    pepeplanet.players[key].wayPoints = [];
    pepeplanet.players[key].recordData = [];
  });

  log.white('end map, players pool cleared');
  client.query('SendHideManialinkPage', []);
};

export default EndMap;
