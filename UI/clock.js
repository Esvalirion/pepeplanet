import Mustache from 'mustache';
// import fns from 'date-fns';
import log from '../utils/log.js';

/*
 * test file, no guarantee that it works
 */
const template = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manialink version="3">
  <label pos="0 0" textsize="1" textcolor="000000" text="{{ time }}" />
</manialink>
`;

const genereateClock = async (login, client) => {
  const { ChatTime } = await client.query('GetCurrentGameInfo', [login]);

  log.white('--- genereateClock');
  log.white(JSON.stringify(ChatTime));
  log.white('--- genereateClock');

  const time = {
    ChatTime,
  };

  const tmpl = Mustache.render(template, time);

  client.query('SendDisplayManialinkPageToLogin', [login, tmpl, 0, false]);
};

export default genereateClock;
