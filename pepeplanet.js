import gbxremote from 'gbxremote';
import config from './config.js';

import log from './utils/log.js';
import server from './utils/server.js';
import runningMessage from './utils/runningMessage.js';

const pepeplanet = {
  client: null,

  triggerModeScript: async function(client) {
    try {
      await client.query('TriggerModeScriptEventArray', ['XmlRpc.EnableCallbacks', ['true']]);

      log.green('Script callbacks enabled ...');
      this.client = client;

      log.green(runningMessage);
    } catch {
      log.red('TriggerModeScriptEventArray failed');
      process.exit(1);
    }
  },

  enableCallbacks: async function(client) {
    try  {
      await client.query('EnableCallbacks', [true])

      log.green('Callbacks enabled ...');
      this.triggerModeScript(client);
    } catch {
      log.red('EnableCallbacks failed');
      process.exit(1);
    }

  },

  authenticate: async function(client) {
    try {
      await client.query('Authenticate', [config.trackmania.login, config.trackmania.password]);

      log.green('Authenticated ...');
      server.log('How it feels, pepegas, pepeplanet is here!');

      this.enableCallbacks(client);
    } catch {
      log.red('Authenticate failed');
      process.exit(1);
    }
  },

  connect: function() {
    const client = gbxremote.createClient(config.trackmania.port);

    client.on('error', () => {
      log.red('Could not connect to server');
      process.exit(1);
    });

    log.green('Connected ...');
    client.on('connect', () => this.authenticate(client));
  },
};

pepeplanet.connect();

export default pepeplanet;
