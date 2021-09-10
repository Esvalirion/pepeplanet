import gbxremote from 'gbxremote';
import _ from 'lodash';
import config from './config.js';

import log from './utils/log.js';
import server from './utils/server.js';
import runningMessage from './utils/runningMessage.js';

import methodsList from './methods/index.js';

const pepeplanet = {
  client: null,

  startCallbackListening: async function() {
    this.client.on('callback', function(method, params) {
      const callbackFn = _.get(methodsList, method);
      callbackFn(params, this.client);
    });
  },

  triggerModeScript: async function(client) {
    try {
      await client.query('TriggerModeScriptEventArray', ['XmlRpc.EnableCallbacks', ['true']]);

      log.green('Script callbacks enabled ...');
      log.green(runningMessage);

      this.client = client;

      server.log('How it feels, pepegas, pepeplanet is here!');

      this.startCallbackListening();
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
