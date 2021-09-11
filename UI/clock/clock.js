import template from './template.xml.js';

const genereateClock = (login, client) => {
  const tmpl = template();
  client.query('SendDisplayManialinkPageToLogin', [login, tmpl, 0, false]);
};

export default genereateClock;
