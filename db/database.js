import fs from 'fs';
import pool from './pool.js';
import log from '../utils/log.js';
import players from './players.js';
import records from './records.js';
import checkpoints from './checkpoints.js';

/**
 *  Execute sql script which checks if all necessary tables exist in the MySQL database and creates
 *  them if necessary
 * */
const mysqlCheckAndDeployTables = async () => {
  // get sql from file
  const sqlToCreateMissingTables = await fs.promises.readFile('./script.sql', 'utf-8')
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
  await queries.reduce(async (promise, query) => {
    // evade case with whitespace query
    if (query.length > 1) {
      // create table if missing
      promise.then(
        () => pool.query(query).then(() => log.white(`Query ${query} executed correctly`))
          .catch((e) => {
            log.red(`MySQL database error: ${JSON.stringify(e, null, 2)}`);
            process.exit(1);
          }),
      );
    }
  },
  starterPromise);
};

export default {
  players,
  records,
  checkpoints,
  mysqlCheckAndDeployTables,
};
