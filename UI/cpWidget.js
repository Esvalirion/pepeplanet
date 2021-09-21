import raceTime from '../utils/raceTime.js';
import checkpointdb from '../db/checkpoints.js';
import pepeplanet from '../pepeplanet.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const attrs = {
  frameName: 'cpWidget',
  hiddenPos: '28 0',
  closedIcon: '🏁',
};

const defaultCpsList = (cps, NbCheckpoints, login) => {
  let height = 42;
  let color = null;

  const { wayPoints } = pepeplanet.players[login];

  if (!cps.length || cps.length < NbCheckpoints - 1) {
    return `
      <quad size="28 9" halign="right" pos="160 45" bgcolor="000000" opacity="0.6" valign="top"/>

      <label pos="155 42" textsize="1.2" textcolor="FFFFFF" text="no records yet" z-index="2" textfont="RajdhaniMono" halign="right" valign="top"/>
    `;
  }

  const cpList = cps.reduce((acc, res, index) => {
    if (wayPoints[index]) {
      const { time, oldTime } = wayPoints[index];
      if (time > oldTime) {
        color = 'ff3300';
      }
      if (time < oldTime) {
        color = '3333ff';
      }
    }

    const newLabel = `
      <label pos="155 ${height}" textsize="1.2" textcolor="${color || 'FFFFFF'}" text="${index} - ${raceTime(res.time)}" z-index="2" textfont="RajdhaniMono" halign="right" valign="top"/>
    `;

    height -= 4;

    return `${acc}${newLabel}`;
  }, '');

  const bg = `
    <quad size="28 ${4.7 * cps.length}" halign="right" pos="160 45" bgcolor="000000" opacity="0.6" valign="top"/>
  `;

  return cpList + bg;
};

const template = async (client, login) => {
  const { UId, NbCheckpoints } = await client.query('GetCurrentMapInfo', []);

  const cps = await checkpointdb.getListOfPersonalBestCheckpointsOnMap(UId, login);

  return `
    <frame id="${attrs.frameName}">
      <label id="${attrs.frameName}arrow" class="trigger${attrs.frameName} text-light" pos="129.5 42.5" size="5 5" text="❌" textfont="RajdhaniMono" textsize="1" ScriptEvents="1" halign="center" valign="center" />

      ${defaultCpsList(cps, NbCheckpoints, login)}
    </frame>
  `;
};

export default {
  template,
  attrs,
};
