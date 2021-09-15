import pepeplanet from '../pepeplanet.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const server = {
  log: (message) => {
    pepeplanet.client.query('ChatSendServerMessage', [message]);
  },
  private: (message, login) => {
    pepeplanet.client.query('ChatSendServerMessageToLogin', [`${message}`, login]);
  },
};

export default server;
