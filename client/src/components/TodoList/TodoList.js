import React from 'react';
import styled from 'styled-components/macro';
import TodoItem from '../TodoItem/TodoItem';
import {
  ActionProvider,
  StateContext,
  DispatchContext,
} from '../../contexts/Context';

const TodoList = styled.div``;

var ID = function() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

export function CreateTodo() {
  const dispatch = React.useContext(DispatchContext);
  const [newTodo, setNewTodo] = React.useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({
          type: 'CREATE',
          payload: { _id: `${ID()}`, text: newTodo, completed: false },
        });
      }}
    >
      <input type="text" onChange={e => setNewTodo(e.target.value)} />
      <button type="submit" value="Submit">
        Save
      </button>
    </form>
  );
}

const MemoizeCreateTodo = React.memo(CreateTodo);

const TodoListComponent = ({ items }) => {
  return (
    <>
      <TodoList>
        {items?.map(item => {
          return (
            <TodoItem key={item._id} id={item._id} completed={item.completed}>
              {item.text}
            </TodoItem>
          );
        })}
      </TodoList>
      <MemoizeCreateTodo />
    </>
  );
};

const MemoizeTodoListComponent = React.memo(TodoListComponent);

export default MemoizeTodoListComponent;
