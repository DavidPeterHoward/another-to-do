import React from 'react';
import styled, { css } from 'styled-components/macro';
import { DispatchContext } from '../../contexts/Context';

export const Todo = styled.div`
  ${props =>
    props.completed &&
    css`
      text-decoration: line-through;
      color: red;
    `}
`;

export const Checkbox = props => <input type="checkbox" {...props} />;

export function useChangeIsChecked(initialState = false, id) {
  const dispatch = React.useContext(DispatchContext);
  const [checked, setChecked] = React.useState(initialState);
  const changeCompleted = () => {
    setChecked(!checked);
    dispatch &&
      dispatch({
        type: 'COMPLETED',
        payload: { _id: id, completed: initialState },
      });
  };
  return { checked, changeCompleted };
}

export function useDelete(id) {
  const dispatch = React.useContext(DispatchContext);
  const [deleted, setDeleted] = React.useState(false);
  const HandleDeleteTodo = () => {
    setDeleted(!deleted);
    dispatch && dispatch({ type: 'DELETE', payload: { _id: id } });
  };
  return { HandleDeleteTodo, deleted };
}

export const TodoContainer = props => {
  const { checked, changeCompleted } = useChangeIsChecked(
    props.completed,
    props.id,
  );
  return (
    <>
      <Todo completed={checked} onClick={changeCompleted}>
        {props.children}
      </Todo>
      <Checkbox checked={checked} onChange={changeCompleted} />
      <DeleteTodo id={props.id} />
    </>
  );
};

export const DeleteTodo = props => {
  const { HandleDeleteTodo, deleted } = useDelete(props.id);
  return (
    <div onClick={HandleDeleteTodo} checkDeleted={deleted}>
      X
    </div>
  );
};

const MemoizeTodoComponent = React.memo(TodoContainer);

export default MemoizeTodoComponent;
