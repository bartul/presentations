import { configure } from '@storybook/react';

function loadStories() {
    require('../03-atoms-vdom.js');
    require('../04-lenses.js');
}

configure(loadStories, module);