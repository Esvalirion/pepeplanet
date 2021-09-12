import gbxremote from 'gbxremote';
import _ from 'lodash';
import config from './config.js';

import log from './utils/log.js';
import server from './utils/server.js';
import runningMessage from './utils/runningMessage.js';

import methodsList from './methods/index.js';

import generateUI from './UI/generateUI.js';

const pepeplanet = {
  client: null,

  async renderNewUI() {
    const playerList = await this.client.query('GetPlayerList', [100, 0]);

    playerList.forEach((player) => {
      if (player.playerID === 0) return;

      generateUI(player.Login, this.client);
    });
  },

  async startCallbackListening() {
    this.client.on('callback', (method, params) => {
      let callbackFn = _.get(methodsList, method.split('.')[1]);
      let attrs = params;

      if (method.split('.')[1] === 'ModeScriptCallbackArray') {
        if (params[0].split('.')[1] === 'Event') {
          callbackFn = _.get(methodsList, params[0].split('.')[2]);
        } else {
          callbackFn = _.get(methodsList, params[0].split('.')[1]);
        }

        attrs = JSON.parse(params[1][0]);
      }

      if (!callbackFn) {
        // log.red('Unregistered method detected, captain!');
        // log.white(method);
        // log.white(JSON.stringify(params));
        // log.white('----------');
        return;
      }

      // log.green('Registered method, captain!');
      // log.white(method);
      // log.white(JSON.stringify(params));
      // log.white('----------');

      callbackFn(attrs, this.client);
    });
  },

  async triggerModeScript(client) {
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

    server.log('$0f0How it feels, pepegas, pepeplanet is here!');

    this.startCallbackListening();
    this.renderNewUI();
  },

  async enableCallbacks(client) {
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

  async authenticate(client) {
    // https://doc.maniaplanet.com/dedicated-server/references/xml-rpc-callbacks
    // https://doc.maniaplanet.com/dedicated-server/references/xml-rpc-methods
    await client.query('SetApiVersion', ['2019-03-02']);

    try {
      await client.query('Authenticate', [config.trackmania.login, config.trackmania.password]);
    } catch (err) {
      log.red('Authenticate failed');
      log.red(err);
      process.exit(1);
    }

    log.green('Authenticated ...');
    this.enableCallbacks(client);
  },

  connect() {
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
