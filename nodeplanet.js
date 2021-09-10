import gbxremote from 'gbxremote';
import config from './config.js';
import log from './utils/log.js';

const nodeplanet = {
  client: null,
  startup: () => {
    const client = gbxremote.createClient(config.trackmania.port);

    client.on('error', () => {
      log.red('Could not connect to server');
    });

    client.on('connect', () => {
      log.green('Connected!');
    });
  },
};

export default nodeplanet;
