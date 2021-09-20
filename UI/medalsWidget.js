import raceTime from '../utils/raceTime.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const attrs = {
  frameName: 'medalsWidget',
  hiddenPos: '32 0',
  closedIcon: 'Щ', // TODO: add normal icon
};

const template = async (client) => {
  const {
    AuthorTime,
    BronzeTime,
    SilverTime,
    GoldTime,
  } = await client.query('GetCurrentMapInfo', []);

  return `
    <frame id="${attrs.frameName}">
      <label id="${attrs.frameName}arrow" class="trigger${attrs.frameName} text-light" pos="125.5 65" size="5 5" text="❌" textfont="RajdhaniMono" textsize="1" ScriptEvents="1" halign="center" valign="center" />

      <quad size="32 20" halign="right" pos="160 67.5" bgcolor="000000" opacity="0.6" valign="top"/>

      <label pos="155 64" textsize="1.2" textcolor="FFFFFF" text="author ${raceTime(AuthorTime)}" z-index="2" textfont="RajdhaniMono" halign="right" valign="center"/>
      <label pos="155 60" textsize="1.2" textcolor="FFFFFF" text="gold ${raceTime(GoldTime)}" z-index="2" textfont="RajdhaniMono" halign="right" valign="center"/>
      <label pos="155 56" textsize="1.2" textcolor="FFFFFF" text="silver ${raceTime(SilverTime)}" z-index="2" textfont="RajdhaniMono" halign="right" valign="center"/>
      <label pos="155 52" textsize="1.2" textcolor="FFFFFF" text="bronze ${raceTime(BronzeTime)}" z-index="2" textfont="RajdhaniMono" halign="right" valign="center"/>
    </frame>
  `;
};

export default {
  template,
  attrs,
};
