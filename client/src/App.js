import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList/TodoList';

setConfig({
  ignoreSFC: !!ReactDOM.setHotElementComparator,
  pureSFC: true,
  pureRender: true,
  logLevel: 'debug',
  hotHooks: true,
});

var ID = function() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

const items = [
  { _id: `${ID()}`, text: 'a single todo item', completed: 0 },
  { _id: `${ID()}`, text: 'a single todo item_2', completed: 0 },
  { _id: `${ID()}`, text: 'a single todo item_3', completed: 1 },
  { _id: `${ID()}`, text: 'a single todo item_4', completed: 1 },
  { _id: `${ID()}`, text: 'a single todo item_5', completed: 0 },
];

const App = () => {
  return (
    <div>
      <TodoList items={items} />
    </div>
  );
};

// export default App;
export default hot(App);
