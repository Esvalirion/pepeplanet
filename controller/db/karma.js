import mysql from 'mysql2/promise';
import pool from './pool.js';
import log from '../utils/log.js';

/**
 * Author il12 (https://github.com/il12)\\
 * @param id {string} Player id
 * @param uid {string} Map uid
 * @param vote {number} Player vote
 */
const upsertKarma = async (id, uid, vote) => {
  const sql = `
            INSERT INTO karma (login, uid, vote)
            VALUES(?, ?, ?)
            ON DUPLICATE KEY UPDATE
                vote = ?
            `;

  const preparedSql = mysql.format(sql, [id, uid, vote, vote]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in upsertKarma, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res);
};

/**
 * @param uid {string} Map uid
 */
const getKarma = async (uid) => {
  const sql = `
                SELECT uid, SUM(vote) FROM karma
                WHERE
                    uid = ?
                GROUP BY uid
            `;

  const preparedSql = mysql.format(sql, [uid]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in getKarma, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return res[0];
};

/**
 * @param uid {string} Map uid
 */
const forceResetKarma = async (uid) => {
  const sql = `
                UPDATE karma
                SET
                    vote=0
                WHERE
                    uid = ?;
            `;

  const preparedSql = mysql.format(sql, [uid]);
  const res = await pool.query(preparedSql).catch((e) => {
    log.red('MySQL database error, captain!');
    log.red('Something wrong in getKarma, captain!');
    log.red(JSON.stringify(e, null, 2));
    process.exit(1);
  });

  return Boolean(res);
};

export default {
  upsertKarma,
  getKarma,
  forceResetKarma,
};
