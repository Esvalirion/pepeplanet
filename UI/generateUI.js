import mainFrame from './mainFrame.js';

import templates from './templates.js';

const generateUI = (login, client) => {
  const tmpl = mainFrame(templates.map((template) => template()));

  client.query('SendDisplayManialinkPageToLogin', [login, tmpl, 0, false]);
};

export default generateUI;
