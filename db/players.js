import mysql from 'mysql2/promise';
import pool from './pool.js';
import log from '../utils/log.js';

/**
 * Author il12 (https://github.com/il12)
 * @param id {string} Player id
 */
const getPlayer = async (id) => {
  const sql = `
                SELECT * FROM players
                WHERE id = ?
                LIMIT 1
            `;

  const preparedSql = mysql.format(sql, [id]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in getPlayer, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res[0];
};

/**
 * @param id {string} Player id
 * @param name {string} Player name
 * @param ip {string} Player ip
 */
const upsertPlayer = async (id, name, ip) => {
  const sql = `
            INSERT INTO players (id, name, ip)
            VALUES(?, ?, ?)
            ON DUPLICATE KEY UPDATE
                id = ?,
                name = ?,
                ip = ?,
                lastVisit = NOW()
            `;

  const preparedSql = mysql.format(sql, [id, name, ip, id, name, ip]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in upsertPlayer, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res);
};

/**
 * @param login {string} Player login
 */
const existPlayer = async (login) => {
  const sql = `
            SELECT 1 FROM players
                WHERE login = ?
                LIMIT 1;
            `;

  const preparedSql = mysql.format(sql, [login]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in existPlayer, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res[0].length);
};

/**
 * @param id Player id
 */
const removePlayer = async (id) => {
  const sql = `
            DELETE FROM players
                WHERE id = ?;
            `;

  const preparedSql = mysql.format(sql, [id]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in removePlayer, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res.length);
};

export default {
  getPlayer,
  upsertPlayer,
  existPlayer,
  removePlayer,
};
