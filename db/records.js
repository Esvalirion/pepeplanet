import mysql from 'mysql2/promise';

import pool from './pool.js';
import log from '../utils/log.js';

/**
 * Author il12 (https://github.com/il12)
 * @param map {string} Map UID
 * @param login {string} Player login
 */

const getRecord = async (map, login) => {
  const sql = `
                SELECT * FROM records
                WHERE
                    login = ? AND
                    uid = ?
                ORDER BY time
                LIMIT 1
            `;

  const preparedSql = mysql.format(sql, [login, map]);
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
 */
const getRecordListOnMap = async (map) => {
  const sql = `
                SELECT * FROM records
                WHERE
                    uid = ?
                ORDER BY time
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
 * @param record {object} Local Record Info object
 * @param record.map {string} Map UID
 * @param record.login {string} Player login
 */
const getRecordRank = async (record) => {
  const sql = `
                SELECT ROW_NUMBER() OVER(ORDER BY time ASC) AS rank FROM records
                WHERE
                    uid = ? AND
                    login = ?
                LIMIT 1;
            `;

  const preparedSql = mysql.format(sql, [record.map, record.login]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in getRecordRank, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res[0].rank;
};

/**
 * @param record {object} Record object
 * @param record.map {string} Map UID
 * @param record.login {string} Player login
 * @param record.time {number} Record time
 */
const upsertRecord = async (record) => {
  const sql = `
            INSERT INTO records (uid, login, time)
            VALUES(?, ?, ?)
            ON DUPLICATE KEY UPDATE
                time = ?
            `;

  const preparedSql = mysql.format(sql, [record.map, record.login, record.time, record.time]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in upsertRecord, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res);
};

export default {
  getRecord,
  getRecordRank,
  getRecordListOnMap,
  upsertRecord,
};
