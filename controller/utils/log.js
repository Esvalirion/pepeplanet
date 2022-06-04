/* eslint no-console: 0 */
import chalk from 'chalk';
import fns from 'date-fns';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const getDateString = () => {
  const timeNow = new Date();

  const dateString = fns.format(timeNow, 'dd.MM.yyyy');
  const timeString = fns.format(timeNow, 'HH:mm:ss');

  return {
    dateString,
    timeString,
  };
};

const log = {
  red: (message) => {
    const { dateString, timeString } = getDateString();
    console.log(`[${dateString} at ${timeString}]: ❌ ${chalk.red(message)}`);
  },
  green: (message) => {
    const { dateString, timeString } = getDateString();
    console.log(`[${dateString} at ${timeString}]: ${chalk.green(message)}`);
  },
  yellow: (message) => {
    const { dateString, timeString } = getDateString();
    console.log(`[${dateString} at ${timeString}]: ${chalk.yellow(message)}`);
  },
  white: (message) => {
    const { dateString, timeString } = getDateString();
    console.log(`[${dateString} at ${timeString}]: ${chalk.white(message)}`);
  },
};

export default log;
