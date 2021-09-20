/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const attrs = {
  frameName: 'clockWidget',
  hiddenPos: '25 0',
  closedIcon: '🕑',
};

const template = `
  <frame id="${attrs.frameName}">
    <label id="${attrs.frameName}arrow" class="trigger${attrs.frameName} text-light" pos="132.5 77.5" size="5 5" text="❌" textfont="RajdhaniMono" textsize="1" ScriptEvents="1" halign="center" valign="center" />

    <quad size="25 10" pos="135 75" bgcolor="000000" opacity="0.6" valign="center"/>

    <label pos="140 75.5" id="clock" textsize="2" textcolor="FFFFFF" text="00:00:00" z-index="2" textfont="RajdhaniMono" valign="center"/>
  </frame>
`;

const declarations = `
declare CMlLabel LabelLocalTime <=> (Page.GetFirstChild("clock") as CMlLabel);

declare Text PrevTime = CurrentLocalDateText;
`;

const loop = `
if (PrevTime != CurrentLocalDateText) {
  PrevTime = CurrentLocalDateText;
  LabelLocalTime.Value = TextLib::SubString(CurrentLocalDateText, 11, 17);
}
`;

export default {
  template,
  declarations,
  loop,
  attrs,
};
