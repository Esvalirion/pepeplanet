import mainFrame from './mainFrame.js';
import templates from './templates.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const generateUI = async (login, client) => {
  const childs = await Promise.all(templates.map(async (tmpl) => {
    let template = tmpl.template;
    if (typeof tmpl.template === 'function') {
      template = await tmpl.template(client);
    }

    let loop = tmpl.loop;
    if (typeof tmpl.loop === 'function') {
      loop = await tmpl.loop(client);
    }

    return {
      ...tmpl,
      template,
      loop,
    }
  }));
  const tmpls = mainFrame({
    childs,
  });

  client.query('SendDisplayManialinkPageToLogin', [login, tmpls, 0, false]);
};

export default generateUI;
