import { exec, spawn } from 'child_process';
import process from 'process';
import path from 'path';
import config from '../config.js';

const stringifyOptions = (options) => Object.keys(options).reduce((acc, key) => {
  if (typeof options[key] !== 'boolean' && options[key].length) {
    return `${acc} /${key}="${options[key]}"`;
  } if (options[key]) {
    return `${acc} /${key}`;
  }
  return acc;
}, '');

const stopTMDedicatedServer = () => {
  const ENV_PLATFORM = process.platform;
  if (ENV_PLATFORM === 'win32') {
    exec(' chcp 65001; Get-Process TrackmaniaServer -ErrorAction SilentlyContinue | Stop-Process -PassThru;',
      {
        shell: 'powershell.exe',
        encoding: 'utf8',
        cwd: config.TMDS.pathToTMServerDirectory,
      }, (err, stdout, stderr) => {
        if (err) throw (err);
        console.log(Buffer.from(stderr, 'utf-8').toString());
        console.log(Buffer.from(stdout, 'utf-8').toString());
      });
  } else if (ENV_PLATFORM === 'linux') {
  // TODO:
  } else {
    console.log('This function has not yet been implemented on your architecture');
  }
};

const startTMDedicatedServer = () => {
  try {
    const TMServerFile = path.join(config.TMDS.pathToTMServerDirectory, 'TrackmaniaServer.exe');

    const TMServerOptions = config.TMDS.options;

    const ENV_PLATFORM = process.platform;
    if (ENV_PLATFORM === 'win32') {
      spawn(`
        chcp 65001; ${TMServerFile} ${stringifyOptions(TMServerOptions)}`,
      {
        shell: 'powershell.exe',
        encoding: 'utf8',
        cwd: config.TMDS.pathToTMServerDirectory,
      });
    } else if (ENV_PLATFORM === 'linux') {
      // TODO:
    } else {
      console.log('This function has not yet been implemented on your architecture');
    }
  } catch (e) {
    console.log(e);
  }
};

const restartTMDedicatedServer = () => {
  try {
    const TMServerFile = path.join(config.TMDS.pathToTMServerDirectory, 'TrackmaniaServer.exe');

    const TMServerOptions = config.TMDS.options;

    const ENV_PLATFORM = process.platform;
    if (ENV_PLATFORM === 'win32') {
      const TMServer = spawn(`
        chcp 65001;
        Get-Process TrackmaniaServer -ErrorAction SilentlyContinue | Stop-Process -PassThru;
        ${TMServerFile} ${stringifyOptions(TMServerOptions)}`,
      {
        shell: 'powershell.exe',
        encoding: 'utf8',
        cwd: config.TMDS.pathToTMServerDirectory,
      });
    } else if (ENV_PLATFORM === 'linux') {
      // TODO:
    } else {
      console.log('This function has not yet been implemented on your architecture');
    }
  } catch (e) {
    console.log(e);
  }
};

export default {
  stopTMDedicatedServer,
  startTMDedicatedServer,
  restartTMDedicatedServer,
};

startTMDedicatedServer();
