const config = {
  // Trackmania server settings
  trackmania: {
    // server port on localhost
    port: 5555,

    // Authentication details for SuperAdmin
    login: 'SuperAdmin',
    password: 'SuperAdmin',

    // Game: TM2020
    game: 'TM2020',

    // The login of the server at the master server, look it up on the player page in doubt
    server_login: 'blah',

    // The matchsettings file the server is started with
    matchsettings_file: 'set.txt',
  },

  usedDatabase: 'mysql',

  // MySQL database settings
  mySql: {
    // host and port
    host: 'localhost',
    port: 3306,

    // user and password
    user: 'root',
    password: 'password',

    // database name
    database: 'nodecontrol',
  },

  // List of disabled plugins by their name
  // disabledPlugins: ['Sample Plugin'],

  // List of administrators by their logins
  admins: [
    'your login here',
  ],

};

export default config;
