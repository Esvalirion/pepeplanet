# pepeplanet

![](https://github.com/Esvalirion/nodeplanet/blob/main/monkasteer.gif)

TrackMania2020 dedicated server controller

### Requirements

- [Node.js LTS](https://nodejs.org/)
- [MySQL](http://dev.mysql.com/downloads/mysql/) 8.0.26 and above
- [Trackmania 2020 Dedicated Server](http://files.v04.maniaplanet.com/server/TrackmaniaServer_Latest.zip)

### Installing the db

In your MySQL server create db

```sh
CREATE DATABASE pepedb CHARACTER SET UTF8mb4 collate utf8mb4_unicode_ci;
```

Create db user

```sh
CREATE USER 'pepega'@'localhost' IDENTIFIED BY 'your password';
```

Grant all access to user

```sh
GRANT ALL PRIVILEGES ON pepedb.* TO 'pepega'@'localhost';
```

### Installation server

Install dependencies

```sh
npm install
```

Edit `config.js` with your settings

### Run

- `npm start`

> if you want run controller in background you can use [pm2](https://pm2.keymetrics.io/)
