/* eslint no-console: 0 */
import chalk from 'chalk';
import fns from 'date-fns';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const getDateString = () => {
  const timeNow = new Date();

  const dateString = fns.format(timeNow, 'dd.MM.yyyy');
  const timeString = fns.format(timeNow, 'mm:ss:SSS');

  return {
    dateString,
    timeString,
  };
};

const { dateString, timeString } = getDateString();

const log = {
  red: (message) => {
    console.log(`[${dateString} at ${timeString}]: ❌ ${chalk.red(message)}`);
  },
  green: (message) => {
    console.log(`[${dateString} at ${timeString}]: ${chalk.green(message)}`);
  },
  yellow: (message) => {
    console.log(`[${dateString} at ${timeString}]: ${chalk.yellow(message)}`);
  },
  white: (message) => {
    console.log(`[${dateString} at ${timeString}]: ${chalk.white(message)}`);
  },
};

export default log;
