import React from 'react';
import TodoComponent, {
  useChangeIsChecked,
  useDelete,
  Checkbox,
  Todo,
  DeleteTodo,
  TodoContainer,
} from './TodoItem';
import { ActionProvider, ActionReducer } from '../../contexts/Context';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

const items = [
  { _id: `1`, text: 'a single todo item', completed: false },
  { _id: `2`, text: 'a single todo item_2', completed: false },
  { _id: `3`, text: 'a single todo item_3', completed: true },
  { _id: `4`, text: 'a single todo item_4', completed: true },
  { _id: `5`, text: 'a single todo item_5', completed: false },
];

describe('<TodoItem/>', () => {
  it('##Testing WrappingContext', () => {});

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
    it('changes completed state onClick', async () => {
      let state = { items: items };
      const dispatch = action => {
        state = ActionReducer(state, action);
      };
      const wrapper = mount(
        <DispatchContext.Provider value={dispatch}>
          <StateContext.Provider value={state}>
            <TodoComponent id={items[0]._id} completed={items[0].completed}>
              {items[0].text}
            </TodoComponent>
          </StateContext.Provider>
        </DispatchContext.Provider>,
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
    const { result } = renderHook(() => useChangeIsChecked(initialValue), {
      wrapper: ({ children }) => <ActionProvider>{children}</ActionProvider>,
    });
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

  describe('useDelete action hook', () => {
    const { result } = renderHook(() => useDelete('1'), {
      wrapper: ({ children }) => <ActionProvider>{children}</ActionProvider>,
    });
    it('expects initially to be false', () => {
      expect(result.current.deleted).to.equal(false);
    });
    it('HandleDeleteTodo should be a function', () => {
      expect(result.current.HandleDeleteTodo).to.be.a('function');
    });
    it('HandleDeleteTodo should switch deleted from false to true', () => {
      expect(result.current.deleted).to.equal(false);
      act(() => {
        result.current.HandleDeleteTodo();
      });
      expect(result.current.deleted).to.equal(true);
    });
  });

  describe('<Checkbox/> within <TodoComponent/>', async () => {
    let state = { items: items };
    const dispatch = action => {
      state = ActionReducer(state, action);
    };
    const wrapper = mount(
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <TodoContainer id={items[0]._id} completed={items[0].completed}>
            {items[0].text}
          </TodoContainer>
        </StateContext.Provider>
      </DispatchContext.Provider>,
    );
    it('changes checkbox check state', async () => {
      expect(wrapper.find(Checkbox).prop('checked')).to.equal(false);
      wrapper.find(Checkbox).simulate('change');
      expect(wrapper.find(Checkbox).prop('checked')).to.equal(true);
    });

    it('renders <Checkbox /> within <TodoComponent/> without crashing', () => {
      const wrapper = shallow(<TodoComponent />);
      expect(wrapper.containsMatchingElement(<Checkbox />)).to.equal(true);
    });

    it('changes checkbox checked state from true to false', () => {
      wrapper.find(Checkbox).simulate('change');
      expect(wrapper.find(Checkbox).prop('checked')).to.equal(false);
    });
    it('checks useDelete ', () => {
      expect(
        wrapper
          .find(DeleteTodo)
          .children()
          .prop('checkDeleted'),
      ).to.equal(false);
      wrapper.find(DeleteTodo).simulate('click');
      expect(
        wrapper
          .find(DeleteTodo)
          .children()
          .prop('checkDeleted'),
      ).to.equal(true);
    });
  });
});
