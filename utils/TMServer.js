import { spawn } from 'child_process';
import process from 'process';
import path from 'path';
import log from './log.js';
import config from '../TMServerConfig.js';

/**
* @param options {object} Options object from ../TMServerConfig.js
 */
const stringifyStartOptions = (options) => Object.keys(options).reduce((acc, key) => {
  if (typeof options[key] !== 'boolean' && options[key].length) {
    return `${acc} /${key}="${options[key]}"`;
  } if (options[key]) {
    return `${acc} /${key}`;
  }
  return acc;
}, '');

/**
 * @param client {client} GBXRemote client
 */
const stopTMDedicatedServer = async (client) => {
  try {
    await client.query('StopServer');
  } catch (e) {
    log.red('Something wrong in stopTMDedicatedServer, admiral');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  }
};

/**
 * @returns {ChildProcessWithoutNullStreams}
 */
// eslint-disable-next-line consistent-return
const startTMDedicatedServer = () => {
  try {
    const TMServerOptions = config.options;

    const ENV_PLATFORM = process.platform;
    if (ENV_PLATFORM === 'win32') {
      const TMServerFile = path.join(config.pathToTMServerDirectory, 'TrackmaniaServer.exe');

      return spawn(`chcp 65001; ${TMServerFile} ${stringifyStartOptions(TMServerOptions)}`,
        {
          shell: 'powershell.exe',
          encoding: 'utf8',
          cwd: config.pathToTMServerDirectory,
        });
    } if (ENV_PLATFORM === 'linux') {
      const TMServerFile = path.join(config.pathToTMServerDirectory, 'TrackmaniaServer');

      return spawn(`${TMServerFile} ${stringifyStartOptions(TMServerOptions)}`,
        {
          encoding: 'utf8',
          cwd: config.pathToTMServerDirectory,
        });
    }
    log.red('This function has not yet been implemented on your architecture');
  } catch (e) {
    log.red('Something wrong in startTMDedicatedServer, admiral');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  }
};

/**
 * @param client {client} GBXRemote client
 */
const restartTMDedicatedServer = (client) => {
  client.query('StopServer').then(() => {
    startTMDedicatedServer();
  }).catch((e) => {
    log.red('Something wrong in restartTMDedicatedServer, admiral');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });
};

export default {
  stopTMDedicatedServer,
  startTMDedicatedServer,
  restartTMDedicatedServer,
};
