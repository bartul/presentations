import Atom from 'kefir.atom';
import * as L from 'partial.lenses';
import React from 'karet';
import * as U from 'karet.util';
import R from 'ramda';
import { storiesOf } from '@storybook/react';

const names = Atom(['Alan Ford', 'Bob Rock']);

const first = names.view([L.index(0)]);

// names.log('names'); 
first.log('first'); 

names.set(['Sir Oliver', 'Big Caesar']);

first.set('No 1');

const TextInput = ({value}) => <input {...U.bind({value})}/>;
const ListOfItems = ({names}) =>
    <div>
        <button onClick={() => names.modify(R.append('Sir Oliver'))}>Add data</button>
        <ul>
            {U.mapCached(i => <li key={i}><TextInput value={names.view(i)} /></li>, U.indices(names))}
        </ul>
    </div>;

storiesOf('Lenses', module)
    .add('List of Items', () => <ListOfItems names={names} /> );
