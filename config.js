const config = {
  // Trackmania server settings
  trackmania: {
    // server port on localhost
    port: 5555,

    // Authentication details for SuperAdmin
    login: 'SuperAdmin',
    password: 'SuperAdmin',

    // The login of the server at the master server, look it up on the https://players.trackmania.com/
    server_login: 'login',
  },

  // MySQL database settings
  mySql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    dbname: 'nodecontrol',
  },

  // Administrators logins from https://trackmania.io/#/player
  admins: ['login'],

};

export default config;
