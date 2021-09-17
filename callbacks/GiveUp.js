import pepeplanet from '../pepeplanet.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const GiveUp = (params) => {
  pepeplanet.players[params.login].wayPoints = [];
};

export default GiveUp;
