import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './pool.js';
import log from '../utils/log.js';
import players from './players.js';
import records from './records.js';
import checkpoints from './checkpoints.js';
import karma from './karma.js';
import HUDSettings from './HUDSettings.js';

/**
 * Author il12 (https://github.com/il12)
 * Esvalirion (https://github.com/Esvalirion)
 */

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 *  Execute sql script which checks if all necessary tables exist in the MySQL database and creates
 *  them if necessary
 * */
const mysqlCheckAndDeployTables = async () => {
  // get sql from file
  const sqlToCreateMissingTables = await fs.promises.readFile(
    path.join(__dirname, './script.sql'),
    'utf-8',
  )
    .catch((e) => {
      log.red(`FileSystem Error: ${JSON.stringify(e, null, 2)}`);
      process.exit(1);
    });

  // remove all unnecessary symbols from sql
  const formattedSql = sqlToCreateMissingTables.replace(/\r\n/g, ' ');

  // split sql to single queries
  const queries = formattedSql.split(';');

  // promise to use as initial value in reduce
  const starterPromise = Promise.resolve(null);

  log.green('Database deploying started');
  // create tables if missing
  try {
    await queries.reduce(async (promise, query) => {
      // evade case with whitespace query
      if (query.length > 1) {
        // create table if missing
        promise.then(
          () => pool.query(query).catch((e) => {
            log.red(`MySQL database error: ${JSON.stringify(e, null, 2)}`);
            process.exit(1);
          }),
        );
      }
    },
    starterPromise);
    log.white('Database checked and ready to fire, captain!');
  } catch (e) {
    log.red(e);
    process.exit(1);
  }
};

export default {
  players,
  records,
  checkpoints,
  karma,
  mysqlCheckAndDeployTables,
  HUDSettings,
};
