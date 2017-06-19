import React from 'karet';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';


storiesOf('Atoms', module)
    .add('with click', () => 
        <button onClick={action('clicked')}>Hello Button</button>
    );