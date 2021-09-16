import mysql from 'mysql2/promise';
import pool from './pool.js';
import log from '../utils/log.js';

/**
 * Author il12 (https://github.com/il12)
 * @param login {string} Player login
 */
const getPlayer = async (login) => {
  const sql = `
                SELECT * FROM players
                WHERE login = ?
                LIMIT 1
            `;

  const preparedSql = mysql.format(sql, [login]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in getPlayer, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res[0];
};

/**
 * @param login {string} Player login
 * @param name {string} Player name
 * @param ip {string} Player ip
 */
const upsertPlayer = async (login, name, ip) => {
  const sql = `
            INSERT INTO players (login, name, ip)
            VALUES(?, ?, ?)
            ON DUPLICATE KEY UPDATE
                login = ?,
                name = ?,
                ip = ?
            `;

  const preparedSql = mysql.format(sql, [login, name, ip, login, name, ip]);
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
 * @param login Player login
 */
const removePlayer = async (login) => {
  const sql = `
            DELETE FROM players
                WHERE login = ?;
            `;

  const preparedSql = mysql.format(sql, [login]);
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
