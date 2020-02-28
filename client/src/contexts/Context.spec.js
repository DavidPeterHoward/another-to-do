import React from 'react';
import { ActionReducer } from './Context';

const initialItems = [
  { _id: '1', text: 'a single todo item', completed: false },
];

const expectedItems = [
  { _id: '1', text: 'a single todo item', completed: false },
  { _id: '2', text: 'another todo', completed: false },
];

describe('Reducer Action Tests <ActionReducer/>', () => {
  it('creates todo item', async () => {
    const state = { items: initialItems };
    const newState = ActionReducer(state, {
      type: 'CREATE',
      payload: { _id: '2', text: 'another todo', completed: false },
    });
    expect(newState.items).to.eql(expectedItems);
  });
  it('deletes todo item', async () => {
    const state = { items: initialItems };
    const newState = ActionReducer(state, {
      type: 'DELETE',
      payload: { _id: '1' },
    });
    expect(newState.items).to.be.an('array').that.is.empty;
  });
  it('cannot delete item with incorrect ID', async () => {
    const state = { items: initialItems };
    const newState = ActionReducer(state, {
      type: 'DELETE',
      payload: { _id: '2' },
    });
    expect(newState.items).to.equal(newState.items);
  });
  it('completes the todo item', async () => {
    const state = { items: initialItems };

    const newState = ActionReducer(state, {
      type: 'COMPLETED',
      payload: { _id: '1', text: 'a single todo item', completed: false },
    });
    expect(initialItems[0].completed).to.equal(false);
    expect(newState.items[0].completed).to.equal(true);
  });
});
