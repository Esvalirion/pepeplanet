import gbxremote from 'gbxremote';
import config from './config.js';
import log from './utils/log.js';

const nodeplanet = {
  client: null,
  startup: () => {
    const client = gbxremote.createClient(config.trackmania.port);

    client.on('error', () => {
      log.red('Could not connect to server');
      process.exit();
    });

    client.on('connect', async () => {
      log.green('Connected!');

      await client.query('Authenticate', [config.trackmania.login, config.trackmania.password]).catch(() => {
        log.red('Authentication failed');
        process.exit();
      });

      client.query('ChatSendServerMessage', ['How it feels, pepegas, nodeplanet is here!']);
    });
  },
};

export default nodeplanet;
