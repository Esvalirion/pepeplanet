import gbxremote from 'gbxremote';
import _ from 'lodash';
import config from './config.js';

import log from './utils/log.js';
import server from './utils/server.js';
import runningMessage from './utils/runningMessage.js';
import callbacksList from './callbacks/index.js';
import generateUI from './UI/generateUI.js';

import playerdb from './db/players.js';
import db from './db/database.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const pepeplanet = {
  client: null,

  async renderNewUI(client) {
    const playerList = await client.query('GetPlayerList', [100, 0]);

    playerList.forEach(async ({ Login, playerID }) => {
      if (playerID === 0) return;

      try {
        const { NickName, IPAddress } = await client.query('GetDetailedPlayerInfo', [Login]);

        const isPlayerExist = await playerdb.existPlayer(Login);

        if (!isPlayerExist) {
          await playerdb.upsertPlayer(Login, NickName, IPAddress);
        }

        generateUI(Login, client);
      } catch (err) {
        log.red('Something went wrong in renderNewUI');
        log.red(err);
      }
    });
  },

  async startCallbackListening() {
    this.client.on('callback', (method, params) => {
      let callbackFn = _.get(callbacksList, method.split('.')[1]);
      let attrs = params;

      if (method.split('.')[1] === 'ModeScriptCallbackArray') {
        if (params[0].split('.')[1] === 'Event') {
          callbackFn = _.get(callbacksList, params[0].split('.')[2]);
        } else {
          callbackFn = _.get(callbacksList, params[0].split('.')[1]);
        }

        attrs = JSON.parse(params[1][0]);
      }

      if (!callbackFn) {
        // log.red(`Unregistered method ${method} detected, captain!`);
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
    this.renderNewUI(client);
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

    db.mysqlCheckAndDeployTables();

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
