import mysql from 'mysql2/promise';

import pool from './pool.js';
import log from '../utils/log.js';

/**
 * Author il12 (https://github.com/il12)
 * @param map {string} Map UID
 * @param id {string} Player id
 * @param cp {number} Checkpoint number
 */

const getCheckpoint = async (map, id, cp) => {
  const sql = `
                SELECT * FROM checkpoints
                WHERE
                    id = ? AND
                    uid = ? AND
                    cpNumber = ?
                LIMIT 1
            `;

  const preparedSql = mysql.format(sql, [id, map, cp]);
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
 * @param id {string} Player id
 */
const getListOfPersonalBestCheckpointsOnMap = async (map, id) => {
  const sql = `
                SELECT time, cpNumber FROM checkpoints
                WHERE
                    uid = ? AND
                    id = ?
                ORDER BY cpNumber
            `;

  const preparedSql = mysql.format(sql, [map, id]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in preparedSql, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res[0];
};

/**
 * @param map {string} Map UID
 */
const getListOfBestCheckpointsOnMap = async (map) => {
  const sql = `
                SELECT id, MIN(time), cpNumber FROM checkpoints
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

  return res[0];
};

/**
 * @param record {object} Record object
 * @param record.map {string} Map UID
 * @param record.id {string} Player id
 * @param record.cp {number} Checkpoint number
 * @param record.time {number} Record time

 */
const upsertCheckpoint = async (record) => {
  const sql = `
            INSERT INTO checkpoints (uid, id, cpNumber, time)
            VALUES(?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                time = IF(time > ?, time, ?)
            `;

  const preparedSql = mysql.format(sql, [...Object.values(record), record.time, record.time]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in upsertCheckpoint, captain!');
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
