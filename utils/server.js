import pepeplanet from '../pepeplanet.js';

const server = {
  log: (message) => {
    pepeplanet.client.query('ChatSendServerMessage', [message]);
  },
};

export default server;
