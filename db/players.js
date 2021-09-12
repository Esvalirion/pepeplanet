import mysql from 'mysql2/promise';
import pool from './pool.js';
import log from '../utils/log.js';

/**
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
 * @param login {string} Player object
 * @param name {string} Player object
 */
const upsertPlayer = async (login, name) => {
  const sql = `
            INSERT INTO players (login, name)
            VALUES(?, ?)
            ON DUPLICATE KEY UPDATE
                login = ?,
                name = ?
            `;

  const preparedSql = mysql.format(sql, [login, name, login, name]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in upsertPlayer, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res);
};

/**
 * @param login {string} Player info object
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

  return Boolean(res.length);
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
