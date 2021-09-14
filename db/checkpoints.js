import mysql from 'mysql2/promise';

import pool from './pool.js';
import log from '../utils/log.js';

/**
 * Author il12 (https://github.com/il12)
 * @param map {string} Map UID
 * @param login {string} Player login
 * @param cp {number} Checkpoint number
 */

const getCheckpoint = async (map, login, cp) => {
  const sql = `
                SELECT * FROM checkpoints
                WHERE
                    login = ? AND
                    uid = ? AND
                    cpNumber = ?
                LIMIT 1
            `;

  const preparedSql = mysql.format(sql, [login, map, cp]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in getRecord, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res[0];
};

/**
 * @param map {string} Map UID
 * @param login {string} Player login
 */
const getListOfPersonalBestCheckpointsOnMap = async (map, login) => {
  const sql = `
                SELECT name, time, cpNumber FROM checkpoints
                WHERE
                    uid = ? AND
                    login = ?
                ORDER BY cpNumber
            `;

  const preparedSql = mysql.format(sql, [map, login]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in preparedSql, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res;
};

/**
 * @param map {string} Map UID
 */
const getListOfBestCheckpointsOnMap = async (map) => {
  const sql = `
                SELECT name, MIN(time), cpNumber FROM checkpoints
                WHERE
                    uid = ?
                GROUP BY cpNumber
                ORDER BY cpNumber
            `;

  const preparedSql = mysql.format(sql, [map]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in preparedSql, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res;
};

/**
 * @param record {object} Record object
 * @param record.map {string} Map UID
 * @param record.login {string} Player login
 * @param record.cp {number} Checkpoint number
 * @param record.time {number} Record time

 */
const upsertCheckpoint = async (record) => {
  const sql = `
            INSERT INTO checkpoints (uid, login, cp, time)
            VALUES(?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                time = ?
            `;

  const preparedSql = mysql.format(
    sql,
    [record.map, record.login, record.cp, record.time, record.time],
  );
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in upsertRecord, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res);
};

export default {
  getCheckpoint,
  getListOfPersonalBestCheckpointsOnMap,
  getListOfBestCheckpointsOnMap,
  upsertCheckpoint,
};
