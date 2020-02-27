import React, { useState, useCallback } from 'react';
import TodoComponent, { useChangeIsChecked, Checkbox, Todo } from './TodoItem';

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

describe('<TodoItem/>', () => {
  describe('<TodoComponent/> Component', () => {
    it('renders without crashing', () => {
      shallow(<TodoComponent />);
    });
    it('renders a todo and checks props', () => {
      const wrapper = mount(
        <TodoComponent completed={items[0].completed}>
          {items[0].text}
        </TodoComponent>,
      );
      expect(wrapper.prop('completed')).to.equal(items[0].completed);
    });
    it('changes completed state onClick', () => {
      const wrapper = mount(
        <TodoComponent completed={items[0].completed}>
          {items[0].text}
        </TodoComponent>,
      );
      expect(wrapper.find(Todo).prop('completed')).to.equal(false);
      wrapper.find(Todo).simulate('click');
      expect(wrapper.find(Todo).prop('completed')).to.equal(true);
    });
    it('should render <Checkbox/> within <Todo/>', () => {
      const wrapper = mount(<TodoComponent />);
      expect(wrapper.containsMatchingElement(<Checkbox />)).to.equal(true);
    });
  });

  describe('useChangeIsChecked custom hook', () => {
    let initialValue = false;
    const { result } = renderHook(() => useChangeIsChecked(initialValue));
    it('expects initialValue to be false', () => {
      expect(result.current.checked).to.equal(false);
    });
    it('changeCompleted should be a function', () => {
      expect(result.current.changeCompleted).to.be.a('function');
    });
    it('changeCompleted should switch checked from false to true', () => {
      expect(result.current.checked).to.equal(false);
      act(() => {
        result.current.changeCompleted();
      });
      expect(result.current.checked).to.equal(true);
    });
  });

  describe('<Checkbox/> within <TodoComponent/>', () => {
    const wrapper = mount(<TodoComponent />);
    it('renders <Checkbox /> within <TodoComponent/> without crashing', () => {
      const wrapper = shallow(<TodoComponent />);
      expect(wrapper.containsMatchingElement(<Checkbox />)).to.equal(true);
    });
    it('changes checkbox check state', () => {
      expect(wrapper.find(Checkbox).prop('checked')).to.equal(false);
      wrapper.find(Checkbox).simulate('change');
      expect(wrapper.find(Checkbox).prop('checked')).to.equal(true);
    });
    it('changes checkbox checked state from true to false', () => {
      wrapper.find(Checkbox).simulate('change');
      expect(wrapper.find(Checkbox).prop('checked')).to.equal(false);
    });
  });
});
