import React from 'karet';
import Atom from 'kefir.atom';
import { storiesOf } from '@storybook/react';

// The way components are expressed using only:
// - reactive properties,
// - reactive variables, and
// - functions returning VDOM

const DisplayInput = ({input}) => <div>{input}</div>;
const ProduceOutput = ({output}) => <input type='text' onChange={e => output.set(e.target.value)} />;

const Composition = ({variable = Atom('')}) => 
    <div>
        <ProduceOutput output={variable} />
        <DisplayInput input={variable} />
    </div>;

const FurtherComposition = ({variable = Atom('')}) =>
    <div>
        <Composition {...{variable}} />
        <DisplayInput input={variable} />
    </div>

// Techniques used:
// - Observables for dependent computations
// - Embedding observables into VDOM
// - Atoms for storing state
// - Lenses for decomposing state

storiesOf('Composition', module)
    .add('Basic', () => <Composition />)
    .add('Further', () => <FurtherComposition />)
