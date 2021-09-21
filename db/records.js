import mysql from 'mysql2/promise';

import pool from './pool.js';
import log from '../utils/log.js';

/**
 * Author il12 (https://github.com/il12)
 * @param map {string} Map UID
 * @param id {string} Player id
 */

const getRecord = async (map, id) => {
  const sql = `
                SELECT * FROM records
                WHERE
                    id = ? AND
                    uid = ?
                ORDER BY time
                LIMIT 1
            `;

  const preparedSql = mysql.format(sql, [id, map]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in getRecord, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res[0][0];
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
 * @param record.id {string} Player id
 */
const getRecordRank = async (record) => {
  const sql = `
                SELECT ROW_NUMBER() OVER(ORDER BY time ASC) AS rank FROM records
                WHERE
                    uid = ? AND
                    id = ?
                LIMIT 1;
            `;

  const preparedSql = mysql.format(sql, [record.map, record.id]);
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
 * @param record.id {string} Player id
 * @param record.time {number} Record time
 */
const upsertRecord = async (record) => {
  const sql = `
            INSERT INTO records (uid, id, time)
            VALUES(?, ?, ?)
            ON DUPLICATE KEY UPDATE
                time = IF(time > ?, time, ?)
            `;

  const preparedSql = mysql.format(
    sql,
    [record.map, record.id, record.time, record.time, record.time],
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
  getRecord,
  getRecordRank,
  getRecordListOnMap,
  upsertRecord,
};
