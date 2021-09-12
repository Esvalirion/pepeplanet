import mainFrame from './mainFrame.js';

import templates from './templates.js';

const generateUI = (login, client) => {
  const tmpl = mainFrame({ childs: templates });

  client.query('SendDisplayManialinkPageToLogin', [login, tmpl, 0, false]);
};

export default generateUI;
