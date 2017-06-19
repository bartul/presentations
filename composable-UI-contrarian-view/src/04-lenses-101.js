import * as L from 'partial.lenses';

const db = { 'classes': [{'id': '101', 'level': 'Novice'}, 
                         {'id': '202', 'level': 'Intermediate'},
                         {'id': '303', 'level': 'Advanced'}]};

const first = L.compose(L.prop('classes'), L.index(0)); 
L.get(first, db); //*?*/

const firstLevel = L.compose(L.prop('classes'), L.index(0), L.prop('level')); 
L.get(firstLevel, db); //*?*/

const newDb1 = L.set(firstLevel, 'Intro', db); 
L.get(first, db); //*?*/
L.get(first, newDb1); //*?*/

// Abbreviations:
// - L.prop(string) as string,
// - L.index(integer) as integer, and
// - L.compose(...ls) as [...ls].

const newDb2 = L.set(['classes', 0, 'level'], 'Introduction', db)
L.get(first, newDb2); //*?*/









// storiesOf('Lenses', module)
//     .add('Initial', () => <TextInput value={Atom('Hi!')} />);
