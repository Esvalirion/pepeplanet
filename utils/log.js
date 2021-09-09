/* eslint no-console: 0 */
import chalk from 'chalk';

const log = {
  red: message => console.log(chalk.red(message)),
  green: message => console.log(chalk.green(message)),
  yellow: message => console.log(chalk.yellow(message)),
  white: message => console.log(chalk.white(message)),
};

export default log;
