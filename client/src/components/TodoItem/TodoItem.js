import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components/macro';

export const Todo = styled.div`
  ${props =>
    props.completed &&
    css`
      text-decoration: line-through;
      color: red;
    `}
`;

export const Checkbox = props => <input type="checkbox" {...props} />;

export function useChangeIsChecked(initialState = false) {
  const [checked, setChecked] = React.useState(initialState);
  const changeCompleted = React.useCallback(() => setChecked(!checked));
  return { checked, changeCompleted };
}

export default function TodoComponent(props) {
  const { checked, changeCompleted } = useChangeIsChecked(props.completed);
  return (
    <Todo completed={checked} onClick={() => changeCompleted()}>
      {props.children}
      <Checkbox checked={checked} onChange={() => changeCompleted()} />
    </Todo>
  );
}
