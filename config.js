const config = {
  // Trackmania server settings
  trackmania: {
    // server port on localhost, don't use 5000 please
    port: 5555,

    // Authentication details for SuperAdmin
    login: 'SuperAdmin',
    password: 'SuperAdmin',

    // The login of the server at the master server, look it up on the https://players.trackmania.com/
    serverLogin: 'login',
  },

  // MySQL database settings
  mySql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    dbname: 'dbname',
  },

  // Administrators logins from https://trackmania.io/#/player
  admins: ['login'],
};

export default config;
