import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList/TodoList';
import { StateContext } from './contexts/Context';

setConfig({
  ignoreSFC: !!ReactDOM.setHotElementComparator,
  pureSFC: true,
  pureRender: true,
  logLevel: 'debug',
  hotHooks: true,
});

const App = () => {
  const state = React.useContext(StateContext);
  return (
    <div>
      <TodoList items={state?.items} />
    </div>
  );
};

// export default App;
export default hot(App);
