/**
 * Author Esvalirion (https://github.com/Esvalirion)
 * Author il12 (https://github.com/il12)
 */

const config = {
  // Trackmania server settings
  trackmania: {
    // server port on localhost, don't use 5000 please
    port: 5555,
    // don't use "localhost" due to automatic translation to ipv6
    host: '127.0.0.1',

    // Authentication details for SuperAdmin
    login: 'SuperAdmin',
    password: 'SuperAdmin',

    // The login of the server at the master server, look it up on the https://players.trackmania.com/
    serverLogin: 'login',
  },

  // MySQL database settings
  mySql: {
    host: '127.0.0.1',
    port: 3306,
    user: 'pepega',
    password: 'password',
    database: 'pepedb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },

  // Administrators logins from https://trackmania.io/#/player
  admins: ['login'],
};

export default config;
