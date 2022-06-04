import mysql from 'mysql2/promise';
import pool from './pool.js';
import log from '../utils/log.js';

/**
 * Author il12 (https://github.com/il12)
 * Author Esvalirion (https://github.com/Esvalirion)
 * @param map {string} map uid
 */
const getMap = async (map) => {
  const sql = `
                SELECT * FROM maps
                WHERE uid = ?
                LIMIT 1
            `;

  const preparedSql = mysql.format(sql, [map]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in getMap, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res[0];
};

/**
 * @param map {object} map object
 */
const upsertMap = async (map) => {
  const sql = `
            INSERT INTO maps (uid, name, file, author, bronze, silver, gold, at, isMultilap, nbLaps, nbCheckpoints, type, style, tmxid)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                type = ?,
                style = ?,
                file = ?,
                tmxid = ?
            `;

  const preparedSql = mysql.format(sql, [
    ...Object.values(map),
    map.type, map.style, map.file, map.tmxid]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in upsertMap, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res);
};

/**
 * @param map {string} map uid
 */
const existsMap = async (map) => {
  const sql = `
            SELECT 1 FROM maps
                WHERE uid = ?
                LIMIT 1;
            `;

  const preparedSql = mysql.format(sql, [map]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in existsMap, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res[0].length);
};

export default {
  getMap,
  upsertMap,
  existsMap,
};
