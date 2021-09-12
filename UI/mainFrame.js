import Mustache from 'mustache';

const tmpl = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manialink version="3">
  {{#childs}}
    {{.}}
  {{/childs}}
  <script><!--
  declare clockWidget <=> (Page.MainFrame.GetFirstChild("clockWidget") as CMlFrame);

  declare Boolean isClockWidgetVisible = True;

  while (True) {
    yield;

    foreach(event in PendingEvents) {
      if(event.Type == CMlScriptEvent::Type::MouseClick && event.Control.HasClass("triggerClockWidget")) {
        if (isClockWidgetVisible) {
          AnimMgr.Add(mainFrame, "<frame pos='25 0' />", 400, CAnimManager::EAnimManagerEasing::ExpIn);
          isClockWidgetVisible = False;
        } else {
          AnimMgr.Add(mainFrame, "<frame pos='0 0' />", 400, CAnimManager::EAnimManagerEasing::ExpOut);
          isClockWidgetVisible = True;
        }
      }
    }
  }
  --></script>
</manialink>
`;

const mainFrame = (childs) => Mustache.render(tmpl, childs);

export default mainFrame;
