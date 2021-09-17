/**
 * Author Esvalirion (https://github.com/Esvalirion)
 * Author il12 (https://github.com/il12)
 */

const config = {
  // System settings to stop/start/restart TM Server
  TMDS: {
    pathToTMServerDirectory: 'C:\\Users\\Игорь\\Desktop\\TM2020TestServer',
    options: {
      /* Specify a configuration file "dedicated_cfg.txt" to use.
         (value is a filename relative to UserData/Config/) */
      dedicated_cfg: 'dedicated_cfg.txt',

      /* Specify a match settings file to use.
         (value is an absolute file name or relative to UserData/Maps/) */
      game_settings: 'Matchsettings/tracklist.txt',

      /* Override the server name */
      servername: '',

      /* Override which titlepack to load. Normally it takes this from the dedicated_cfg file. */
      title: 'Trackmania',

      /* Dedicated login (required for internet server). Create one on your PlayerPage */
      login: '',

      /* Dedicated password (required for internet server) */
      password: '',

      /* Must be specified to join or create a LAN game (that is, not an internet server) */
      lan: false,

      /* Forces the public ip address to this value. Optionally with a port as well */
      forceip: '',

      /* Chooses the ip to bind to, and sets the public ip to this value.
         (you still can use /forceip to chose a different public ip).
         This is used when the machine has several network interfaces. */
      bindip: '',

      /* (linux) Doesn't automatically detach the process */
      nodaemon: false,

      /* Loads the "checksum.txt" instead of recomputing it, to speed up first launch time
         if P2P is enabled. DO NOT USE if you run several servers in the same directory! */
      loadcache: false,

      /* Disables the creation of "GameLog.txt" and "ConsoleLog.txt" in Logs/ directory. */
      nologs: false,

      /* Keeps the server running "waiting for rpc commands", even if it is not live
         (with a map loaded and ready to receive players).
         The default behaviour is to quit,
         because this situation is mostly caused by configuration errors */
      noautoquit: false,

      /* (Debug option) Display the whole contents of the xml-rpc requests
         the dedicated server receives */
      verbose_rpc_full: true,

      /* (Debug option) Displays the xml-rpc requests the dedicated server receives,
         but only the name of the XmlRpc command and some parameters */
      verbose_rpc: true,

      /* Joins a server as spectator.
         (value is the server ip adress with optional port, or the server login.)
         (this is used to start a relay server) */
      spectate: '',

      /* Password to use to join the server if the server is private */
      serverpassword: '',

      /* Specify a Maniascript file to load in the CServerPlugin context,
         relative to the UserData/Scripts/ folder. */
      serverplugin: '',

      /* Dumps minor JSON output information for a Gbx file relative to the current directory. */
      parsegbx: '',
    },
  },

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
