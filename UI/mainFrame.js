import Mustache from 'mustache';

import defaultTemplate from './defaultTemplate.js';

/**
 * Author Esvalirion (https://github.com/Esvalirion)
 */

const mainFrame = (templates) => Mustache.render(defaultTemplate, templates);

export default mainFrame;
