const attrs = {
  frameName: 'clockWidget',
  hiddenPos: '25 0',
};

const template = () => `
  <frame id="${attrs.frameName}">
    <label class="trigger${attrs.frameName} text-light" pos="130 75" size="10 10" text="►" textfont="RajdhaniMono" textsize="2" ScriptEvents="1" halign="center" valign="center" />

    <quad size="25 10" pos="135 75" bgcolor="000000" opacity="0.3" valign="center"/>

    <label pos="140 75" id="clock" textsize="2" textcolor="FFFFFF" text="00:00:00" z-index="2" textfont="RajdhaniMono" valign="center"/>
  </frame>
`;

const declarations = () => `
#Include "TextLib" as TextLib

declare CMlLabel LabelLocalTime <=> (Page.GetFirstChild("clock") as CMlLabel);

declare Text PrevTime = CurrentLocalDateText;
`;

const loop = () => `
if (PrevTime != CurrentLocalDateText) {
  PrevTime = CurrentLocalDateText;
  LabelLocalTime.Value = TextLib::SubString(CurrentLocalDateText, 11, 17);
}
`;

export default {
  template: template(),
  declarations: declarations(),
  loop: loop(),
  attrs,
};
