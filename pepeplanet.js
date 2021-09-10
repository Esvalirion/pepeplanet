import gbxremote from 'gbxremote';
import _ from 'lodash';
import config from './config.js';

import log from './utils/log.js';
import server from './utils/server.js';
import runningMessage from './utils/runningMessage.js';

import methodsList from './methods/index.js';

const pepeplanet = {
  client: null,

  startCallbackListening: async function () {
    this.client.on('callback', (method, params) => {
      let callbackFn = _.get(methodsList, method.split('.')[1]);
      let attrs = params;

      if (method.split('.')[1] === 'ModeScriptCallbackArray') {
        if (params[0].split('.')[1] === 'Event')
          callbackFn = _.get(methodsList, params[0].split('.')[2])
        else
          callbackFn = _.get(methodsList, params[0].split('.')[1])

        attrs = JSON.parse(params[1][0]);
      }

      if (!callbackFn) {
        log.red('Unregistered method detected, captain!');
        log.white(method);
        log.white(JSON.stringify(params));
        log.white('----------');
        return;
      }

      log.green('Registered method, captain!');
      log.white(method);
      log.white(JSON.stringify(params));
      log.white('----------');

      callbackFn(attrs, this.client);
    });
  },

  triggerModeScript: async function (client) {
    try {
      await client.query('TriggerModeScriptEventArray', ['XmlRpc.EnableCallbacks', ['true']]);
    } catch (err) {
      log.red('TriggerModeScriptEventArray failed');
      log.red(err);
      process.exit(1);
    }

    log.green('Script callbacks enabled ...');
    log.green(runningMessage);

    this.client = client;

    server.log('How it feels, pepegas, pepeplanet is here!');

    this.startCallbackListening();
  },

  enableCallbacks: async function (client) {
    try {
      await client.query('EnableCallbacks', [true]);
    } catch (err) {
      log.red('EnableCallbacks failed');
      log.red(err);
      process.exit(1);
    }

    log.green('Callbacks enabled ...');
    this.triggerModeScript(client);
  },

  authenticate: async function (client) {
    await client.query('SetApiVersion', ['2019-03-02']);
    // const kek = await client.query('system.listMethods');
    // console.log(kek)

    try {
      await client.query('Authenticate', [config.trackmania.login, config.trackmania.password]);
    } catch (err) {
      exception = true;
      log.red('Authenticate failed');
      log.red(err);
      process.exit(1);
    }

    log.green('Authenticated ...');
    this.enableCallbacks(client);
  },

  connect: function () {
    const client = gbxremote.createClient(config.trackmania.port, config.trackmania.host);

    client.on('error', (err) => {
      log.red('Could not connect to server');
      log.red(err);
      process.exit(1);
    });

    log.green('Connected ...');
    client.on('connect', () => this.authenticate(client));
  },
};

pepeplanet.connect();

export default pepeplanet;
