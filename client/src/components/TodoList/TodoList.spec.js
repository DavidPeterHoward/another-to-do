import React from 'react';
import TodoList from './TodoList';

describe('<TodoList/> Component', () => {
  it('renders without crashing', () => {
    shallow(<TodoList />);
  });
});
