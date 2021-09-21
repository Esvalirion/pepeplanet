const mainLoop = `
while (True) {
  yield;

  {{#childs}}
    {{#loop}}
      {{{loop}}}
    {{/loop}}
  {{/childs}}

  foreach(event in PendingEvents) {
    if(event.Type == CMlScriptEvent::Type::MouseClick) {
      {{#childs}}
        if (event.Control.HasClass("trigger{{attrs.frameName}}")) {
          if (is{{attrs.frameName}}Visible) {
            AnimMgr.Add({{attrs.frameName}}Frame, "<frame pos='{{attrs.hiddenPos}}' />", 200, CAnimManager::EAnimManagerEasing::ExpIn);
            is{{attrs.frameName}}Visible = False;
            {{attrs.frameName}}arrow.Value = "{{attrs.closedIcon}}";
          } else {
            AnimMgr.Add({{attrs.frameName}}Frame, "<frame pos='0 0' />", 200, CAnimManager::EAnimManagerEasing::ExpOut);
            is{{attrs.frameName}}Visible = True;
            {{attrs.frameName}}arrow.Value = "❌";
          }
        }
      {{/childs}}
    }
  }
}
`;

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const tmpl = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manialink version="3">
  {{#childs}}
    {{{template}}}
  {{/childs}}
  <script><!--
    #Include "TextLib" as TextLib

    {{#childs}}
      {{#declarations}}
        {{{declarations}}}
      {{/declarations}}
    {{/childs}}

    {{#childs}}
      declare {{attrs.frameName}}Frame <=> (Page.GetFirstChild("{{attrs.frameName}}") as CMlFrame);

      declare Boolean is{{attrs.frameName}}Visible = True;

      declare CMlLabel {{attrs.frameName}}arrow <=> (Page.GetFirstChild("{{attrs.frameName}}arrow") as CMlLabel);
    {{/childs}}

    ${mainLoop}
  --></script>
</manialink>
`;

export default tmpl;
