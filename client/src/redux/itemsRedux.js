import shortid from 'shortid';

// selectors

export const getItems = ({ items }) => items;

//actions

const reducerName = 'items';

const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const LOAD_ITEMS = createActionName('LOAD_ITEMS');
const ADD_ITEM = createActionName('ADD_ITEM');
const REMOVE_ITEM = createActionName('REMOVE_ITEM');

export const loadItems = (payload) => ({ type: LOAD_ITEMS, payload });
export const addItem = (payload) => ({ type: ADD_ITEM, payload });
export const removeItem = (payload) => ({ type: REMOVE_ITEM, payload });

const itemsReducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOAD_ITEMS:
      return { statePart };
    case ADD_ITEM:
      return [...statePart, { ...action.payload, id: shortid() }];
    case REMOVE_ITEM:
      return statePart.map((item) =>
        item.id === action.payload
          ? { ...statePart.filter((item) => item.id !== action.payload) }
          : item
      );
    default:
      return statePart;
  }
};

export default itemsReducer;
