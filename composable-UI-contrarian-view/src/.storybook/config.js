import { configure } from '@storybook/react';

function loadStories() {
    require('../03-atoms-vdom.js');
    require('../05-lenses+atoms.js');
}

configure(loadStories, module);