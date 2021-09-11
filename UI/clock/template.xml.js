const template = () => `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manialink version="3">
  <frame id="window">
    <label class="close text-light" pos="130 85" size="10 10" text="❌" textfont="RajdhaniMono" textsize="2" ScriptEvents="1" halign="center" valign="center" />

    <quad size="25 10" pos="135 90" bgcolor="000000" opacity="0.3"/>

    <label pos="140 86.8" id="clock" textsize="2" textcolor="FFFFFF" text="00:00:00" z-index="2" textfont="RajdhaniMono"/>
  </frame>
  <script><!--
    #Include "TextLib" as TextLib
    main() {
      declare mainFrame <=> (Page.MainFrame.GetFirstChild("window") as CMlFrame);
      declare CMlLabel LabelLocalTime <=> (Page.GetFirstChild("clock") as CMlLabel);

      declare Boolean isVisible = True;
      declare Text PrevTime = CurrentLocalDateText;

      while (True) {
        yield;

        if (PrevTime != CurrentLocalDateText) {
          PrevTime = CurrentLocalDateText;
          LabelLocalTime.Value = TextLib::SubString(CurrentLocalDateText, 11, 17);
        }

        foreach(event in PendingEvents) {
          if(event.Type == CMlScriptEvent::Type::MouseClick && event.Control.HasClass("close")) {
            if (isVisible) {
              AnimMgr.Add(mainFrame, "<frame pos='25 0' />", 400, CAnimManager::EAnimManagerEasing::ExpIn);
              isVisible = False;
            } else {
              AnimMgr.Add(mainFrame, "<frame pos='0 0' />", 400, CAnimManager::EAnimManagerEasing::ExpOut);
              isVisible = True;
            }
          }
        }
      }
    }
  --></script>
</manialink>
`;

export default template;