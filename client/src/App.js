import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

setConfig({
  ignoreSFC: !!ReactDOM.setHotElementComparator,
  pureSFC: true,
  pureRender: true,
  logLevel: 'debug',
  hotHooks: true,
});

const App = () => {
  return (
    <div>
      <p>Test</p>
    </div>
  );
};

// export default App;
export default hot(App);
