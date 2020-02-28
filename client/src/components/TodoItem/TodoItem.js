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
  const HandleDeleteTodo = () => {
    dispatch({ type: 'DELETE', payload: { _id: id } });
  };
  return { HandleDeleteTodo };
}

const TodoComponent = props => {
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

const DeleteTodo = props => {
  const { HandleDeleteTodo } = useDelete(props.id);
  return <div onClick={HandleDeleteTodo}>X</div>;
};

const MemoizeTodoComponent = React.memo(TodoComponent);

export default MemoizeTodoComponent;
