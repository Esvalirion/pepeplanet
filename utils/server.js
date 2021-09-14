import pepeplanet from '../pepeplanet.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const server = {
  log: (message) => {
    pepeplanet.client.query('ChatSendServerMessage', [message]);
  },
  private: (login, message) => {
    pepeplanet.client.query('ChatSendServerMessageToLogin', [login, message]);
  },
};

export default server;
