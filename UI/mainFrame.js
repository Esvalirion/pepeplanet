import Mustache from 'mustache';

const tmpl = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manialink version="3">
  {{#childs}}
    {{{template}}}
  {{/childs}}
  <script><!--
    {{#childs}}
      {{{declarations}}}
    {{/childs}}

    {{#childs}}
      declare {{attrs.frameName}}Frame <=> (Page.GetFirstChild("{{attrs.frameName}}") as CMlFrame);

      declare Boolean is{{attrs.frameName}}Visible = True;
    {{/childs}}

    while (True) {
      yield;

      {{#childs}}
        {{{loop}}}
      {{/childs}}

      foreach(event in PendingEvents) {
        if(event.Type == CMlScriptEvent::Type::MouseClick) {
          {{#childs}}
            if (event.Control.HasClass("trigger{{attrs.frameName}}")) {
              if (is{{attrs.frameName}}Visible) {
                AnimMgr.Add({{attrs.frameName}}Frame, "<frame pos='{{attrs.hiddenPos}}' />", 200, CAnimManager::EAnimManagerEasing::ExpIn);
                is{{attrs.frameName}}Visible = False;
              } else {
                AnimMgr.Add({{attrs.frameName}}Frame, "<frame pos='0 0' />", 200, CAnimManager::EAnimManagerEasing::ExpOut);
                is{{attrs.frameName}}Visible = True;
              }
            }
          {{/childs}}
        }
      }
    }
  --></script>
</manialink>
`;

const mainFrame = (templates) => {
  return Mustache.render(tmpl, templates);
}

export default mainFrame;
