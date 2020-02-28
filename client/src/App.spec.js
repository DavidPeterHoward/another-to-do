import React from 'react';
import App from './App';
import TodoList from './components/TodoList/TodoList';

describe('<App/> Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).be.true;
  });
  it('renders with TodoList', () => {
    const wrapper = mount(<App />);
    expect(wrapper.contains(<TodoList />)).to.equal(true);
  });
});
