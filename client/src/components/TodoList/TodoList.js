import React from 'react';
import styled from 'styled-components/macro';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = styled.div``;

const TodoListComponent = ({ items }) => {
  return (
    <TodoList>
      {items?.map((item, index) => {
        return (
          <TodoItem key={item._id} completed={item.completed}>
            {item.text}
          </TodoItem>
        );
      })}
    </TodoList>
  );
};

export default TodoListComponent;
