import { spawn } from 'child_process';
import process from 'process';
import path from 'path';
import log from './log.js';
import config from '../config.js';

const stringifyStartOptions = (options) => Object.keys(options).reduce((acc, key) => {
  if (typeof options[key] !== 'boolean' && options[key].length) {
    return `${acc} /${key}="${options[key]}"`;
  } if (options[key]) {
    return `${acc} /${key}`;
  }
  return acc;
}, '');

const stopTMDedicatedServer = async (client) => {
  try {
    await client.query('StopServer');
  } catch (e) {
    log.red('Something wrong in stopTMDedicatedServer, admiral');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  }
};

const startTMDedicatedServer = () => {
  try {
    const TMServerOptions = config.TMDS.options;

    const ENV_PLATFORM = process.platform;
    if (ENV_PLATFORM === 'win32') {
      const TMServerFile = path.join(config.TMDS.pathToTMServerDirectory, 'TrackmaniaServer.exe');

      const TMServer = spawn(`
        chcp 65001; ${TMServerFile} ${stringifyStartOptions(TMServerOptions)}`,
      {
        shell: 'powershell.exe',
        encoding: 'utf8',
        cwd: config.TMDS.pathToTMServerDirectory,
      });
    } else if (ENV_PLATFORM === 'linux') {
      const TMServerFile = path.join(config.TMDS.pathToTMServerDirectory, 'TrackmaniaServer');

      const TMServer = spawn(`${TMServerFile} ${stringifyStartOptions(TMServerOptions)}`,
        {
          encoding: 'utf8',
          cwd: config.TMDS.pathToTMServerDirectory,
        });
    } else {
      log.red('This function has not yet been implemented on your architecture');
    }
  } catch (e) {
    log.red('Something wrong in startTMDedicatedServer, admiral');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  }
};

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
