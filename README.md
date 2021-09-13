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
CREATE DATABASE pepeplanet CHARACTER SET UTF8mb4 collate utf8mb4_unicode_ci;
```

Create db user

```sh
CREATE USER 'pepega'@'localhost' IDENTIFIED BY 'your password';
```

Grant all access to user

```sh
GRANT ALL PRIVILEGES ON pepeplanet.* TO 'pepega'@'localhost';
```

Run script from root folder of this project.
(Dont forget to enter 'your password' when mysql ask for it)

```sh
mysql -u pepega -p < ./db/script.sql
```

### Server installation

Install dependencies

```sh
npm install
```

Edit `config.js` with your settings

### Run

- `npm start`

> if you want run controller in background you can use [pm2](https://pm2.keymetrics.io/)
