const config = {
  // Trackmania server settings
  trackmania: {
    // host, if you wanna run controller on local machine
    host: 'localhost',
    // server port on localhost, prefer 5004
    port: 5004,

    // Authentication details for SuperAdmin
    login: 'SuperAdmin',
    password: 'SuperAdmin',

    // The login of the server at the master server, look it up on the https://players.trackmania.com/
    serverLogin: 'tmspirit1',
  },

  // MySQL database settings
  mySql: {
    host: 'localhost',
    port: 3306,
    user: 'pepega',
    password: 'admiralpepega',
    database: 'pepeplanet',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },

  // Administrators logins from https://trackmania.io/#/player
  admins: [
    '-DYRTX1vQmeKs9Vo0gxeGw', // kaolin_sama_TTV
    'df_cg2K_R_mqj2b8hcWngQ' // esvalirion
  ],
};

export default config;
