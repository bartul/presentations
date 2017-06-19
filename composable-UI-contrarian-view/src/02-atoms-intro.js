import Atom from 'kefir.atom';
import R from 'ramda'
import K from 'karet.util'


// Atoms are essentially first-class storage locations or variables
const elements = Atom(['earth', 'water', 'air', 'fire']);
elements.get();
//*? $ */
// elements.log();

// Modifications are executed one by one, this helps to keep the state of an atom consistent.
elements.modify(R.append('salt'));
//*? elements.get() */

// Combining a bunch of properties into a new property that is kept up-to-date with respect to the latest values of the original properties
const x = Atom(1);
const y = Atom(2);
// K combinator
const plus = K(x, y, (x, y) => x + y);
// plus.log('x + y');
// x.set(-2);

const z = Atom(3); 
const minus = K(plus, z, (p, z) => p - z);
// minus.log('x + y - z');
// y.set(5);
// z.set(1);

// Argument for K combinator can be constants
const d = 5;
const minusd = K(plus, d, (p, z) => p - d);
// minusd.log("x + y - d");
// x.set(4);
