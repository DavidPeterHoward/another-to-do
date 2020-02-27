import React from 'react';
import TodoItem from './TodoItem';

describe('<TodoItem/> Component', () => {
  it('renders without crashing', () => {
    shallow(<TodoItem />);
  });
});
