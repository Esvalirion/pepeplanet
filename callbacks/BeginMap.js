import fetch from 'node-fetch';

import pepeplanet from '../pepeplanet.js';

import server from '../utils/server.js';
import log from '../utils/log.js';

import generateUI from '../UI/generateUI.js';
import mapdb from '../db/maps.js';

import raceTime from '../utils/raceTime.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const BeginMap = async (_, client) => {
  try {
    const map = await client.query('GetCurrentMapInfo', []);

    Object.keys(pepeplanet.players).forEach((key) => {
      pepeplanet.players[key].wayPoints = [];
      pepeplanet.players[key].recordData = null;
    });

    log.white('end map, players pool cleared');

    Object.keys(pepeplanet.players).forEach((key) => {
      generateUI(key, client);
    });

    server.log(`$0f0${map.Name}$g, author time is $0f0${raceTime(map.AuthorTime)}, try to beat, pepegas`);

    const isMapExist = await mapdb.existsMap(map.UId);

    if (isMapExist) return;

    const response = await fetch(`https://trackmania.exchange/api/maps/get_map_info/multi/${map.UId}`);
    const mapsInfo = await response.json();

    const mapToDb = {
      uid: map.UId,
      name: map.Name,
      file: map.FileName,
      author: map.Author,
      bronze: map.BronzeTime,
      silver: map.SilverTime,
      gold: map.GoldTime,
      at: map.AuthorTime,
      isMultilap: Boolean(map.LapRace),
      nbLaps: map.NbLaps,
      nbCheckpoints: map.NbCheckpoints,
      type: map.MapType,
      style: map.MapStyle,
      tmxid: mapsInfo[0].TrackID,
    };

    await mapdb.upsertMap(mapToDb);
    log.white(`Added new map to db: ${map.UId} ${map.Name}`);
  } catch (err) {
    log.red('Something went wrong in BeginMap');
    log.red(err);
  }
};

export default BeginMap;
