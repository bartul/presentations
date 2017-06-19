import Atom from 'kefir.atom';
import React from 'karet';
import R from 'ramda';
import K from 'karet.util';
import * as U from 'karet.util';
import { storiesOf } from '@storybook/react';
import L from 'partial.lenses';

const TextInput = ({value}) => <input {...U.bind({value})} />

storiesOf('Lenses', module)
    .add('Initial', () => <TextInput value={Atom('Hi!')} />);
