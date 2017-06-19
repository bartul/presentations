import Atom from 'kefir.atom';
import React from 'karet';
import R from 'ramda';
import K from 'karet.util';
import * as U from 'karet.util';
import { storiesOf } from '@storybook/react';

const Hello = ({ who }) => (<h2>Hello, {who}!</h2>);

const StaticData = () => <Hello who="world" />
const NormalData = () => {
    let data = 'world';
    return (
        <div>
            <button onClick={() => data = 'space'}>Change data</button>
            <Hello who={data} />
        </div>
    )
};
const ReactiveData = () => {
    const data = Atom('world');
    return (
        <div>
            <button onClick={() => data.set('space')}>Change data</button>
            <Hello who={data} />
        </div>
    );
};
const ConverterClassic = ({value = Atom('0')}) => 
    <p>
        <input onChange={e => value.set(e.target.value)} 
               value={value} /> C is {K(value, c => c * 9/5 + 32)} F
    </p>
;
const ConverterWithBind = ({value = Atom('0')}) => 
    <p>
        <input {...U.bind({value})} /> C is {K(value, c => c * 9/5 + 32)} F
    </p>
;

// Is this a good idea at all? Few good reasons:
// - Observables solve the consistency problem quite nicely.
// - Observables with Atoms are powerful enough for managing arbitrary state.
// - Embedding observables into VDOM makes it convenient to use observables.
// - Embedding observables allows VDOM to be updated incrementally and efficiently.

// Eliminates the need to write
// - New React classes using createClass or by inheriting from React.Component
// - Specialized shouldComponentUpdate implementations

const ListOfItemsWithClassicMap = ({names}) =>
    <ul>
        {K(names, R.map(name => <li key={name}>{name}</li>))}
    </ul>;
const ListOfItemsWithClassicMap_Story = () => {
    const names = Atom(['alan ford', 'bob rock']);
    return (
        <div>
            <button onClick={() => names.modify(R.append('Sir Oliver'))}>Add data</button>
            <ListOfItemsWithClassicMap names={names}  />
        </div>
    );
}   

//  VDOM is computed only for new names with respect to the previously displayed list of names. 
// What makes that possible is that the expression name => <li key={name}>{name}</li> specifies a referentially transparent function
const ListOfItemsWithCominator = ({names}) =>
    <ul>
        {U.mapCached(name => <li key={name}>{name}</li>, names)}
    </ul>;
const ListOfItemsWithCombinator_Story = () => {
    const names = Atom(['alan ford', 'bob rock']);
    return (
        <div>
            <button onClick={() => names.modify(R.append('Sir Oliver'))}>Add data</button>
            <ListOfItemsWithClassicMap names={names}  />
        </div>
    );
}   
    


storiesOf('Atoms', module)
    .add('Static data', StaticData)
    .add('Normal data', NormalData)
    .add('Reactive data', ReactiveData)
    .add('Converter - clasic', () => <ConverterClassic />)
    .add('Converter - bind combinator', () => <ConverterWithBind />)
    .add('List of items - map', () => <ListOfItemsWithClassicMap_Story />)
    .add('List of items - mapCached combinator', () => <ListOfItemsWithCombinator_Story />);
