import React from 'react';
import TodoList from './TodoList';
import TodoItem from '../TodoItem/TodoItem';

var ID = function() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

const items = [
  { _id: `${ID()}`, text: 'a single todo item', completed: false },
  { _id: `${ID()}`, text: 'a single todo item_2', completed: false },
  { _id: `${ID()}`, text: 'a single todo item_3', completed: true },
  { _id: `${ID()}`, text: 'a single todo item_4', completed: true },
  { _id: `${ID()}`, text: 'a single todo item_5', completed: false },
];

describe('<TodoList/> Component', () => {
  it('renders without crashing', () => {
    shallow(<TodoList />);
  });
  it('renders with props without crashing', () => {
    shallow(<TodoList items={items} />);
  });
});

describe('<TodoList/> mounts with <TodoItem/>', () => {
  it('mounts with <TodoItem/> with props without crashing', () => {
    const wrapper = mount(<TodoList items={items} />);
    expect(wrapper.containsMatchingElement(TodoItem)).to.equal(true);
  });
  it('does not mount <TodoItem/> without props', () => {
    const wrapper = mount(<TodoList />);
    expect(wrapper.containsMatchingElement(TodoItem)).to.equal(false);
  });
  it('renders children with correct text and key', () => {
    const wrapper = mount(<TodoList items={items} />);
    items.map((item, index) => {
      const WrapperAtLocation = wrapper.find(TodoItem).at(index);
      expect(WrapperAtLocation.key()).to.equal(item._id);
      expect(WrapperAtLocation.text()).to.contain(item.text);
    });
  });
  it('renders correct number of children', () => {
    const wrapper = mount(<TodoList items={items} />);
    expect(wrapper.find(TodoItem).length).to.equal(items.length);
  });
  it('expects TodoItems to have a completed or not completed prop', () => {
    const wrapper = mount(<TodoList items={items} />);
    items.map((item, index) => {
      const WrapperAtLocation = wrapper.find(TodoItem).at(index);
      expect(WrapperAtLocation.prop('completed')).to.equal(item.completed);
    });
  });
});
