import pepeplanet from '../pepeplanet.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const server = {
  log: (message) => {
    pepeplanet.client.query('ChatSendServerMessage', [message]);
  },
};

export default server;
