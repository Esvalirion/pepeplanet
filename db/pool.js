import mysql from 'mysql2/promise';
import config from '../config.js';

/**
 * Author il12 (https://github.com/il12)
 */

const pool = mysql.createPool(config.mySql);

export default pool;
