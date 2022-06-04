import mysql from 'mysql2/promise';
import pool from './pool.js';
import log from '../utils/log.js';

/**
 * Author il12 (https://github.com/il12)
 * @param id {string} Player id
 */
const getHUDSettings = async (id) => {
  const sql = `
                SELECT settings FROM HUD
                WHERE id = ?
                LIMIT 1
            `;

  const preparedSql = mysql.format(sql, [id]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in getHUDSettings, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res[0];
};

/**
 * @param id {string} Player id
 * @param settings {JSON} Player HUD settings
 */
const upsertHUDSettings = async (id, settings) => {
  const sql = `
            INSERT INTO HUD (id, settings)
            VALUES(?, ?)
            ON DUPLICATE KEY UPDATE
                id = ?,
                settings = ?
            `;

  const preparedSql = mysql.format(sql, [id, settings, id, settings]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in upsertHUDSettings, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res);
};

export default {
  getHUDSettings,
  upsertHUDSettings,
};
