import { nanoid } from 'nanoid';

// selectors

export const getItems = ({ items }) => items;

//actions

const reducerName = 'items';

const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const LOAD_ITEMS = createActionName('LOAD_ITEMS');
const ADD_ITEM = createActionName('ADD_ITEM');
const REMOVE_ITEM = createActionName('REMOVE_ITEM');
const REMOVE_ALL_ITEMS = createActionName('REMOVE_ALL_ITEMS');
const ADD_ITEM_BY_LIST = createActionName('ADD_ITEM_BY_LIST');
const GET_ITEMS_BY_LIST = createActionName('GET_ITEMS_BY_LIST');

export const loadItems = (payload) => ({ type: LOAD_ITEMS, payload });
export const addItem = (payload) => ({ type: ADD_ITEM, payload });
export const removeItem = (payload) => ({ type: REMOVE_ITEM, payload });
export const removeAllItems = (payload) => ({
  type: REMOVE_ALL_ITEMS,
  payload,
});
export const addItemsByList = (payload) => ({
  type: ADD_ITEM_BY_LIST,
  payload,
});

export const getItemsByList = (payload) => ({
  type: GET_ITEMS_BY_LIST,
  payload,
});

// export const loadItemsByListRequest =

const itemsReducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOAD_ITEMS:
      return statePart;
    case ADD_ITEM:
      return [...statePart, { ...action.payload, id: nanoid() }];
    case ADD_ITEM_BY_LIST:
      return action.payload;
    // case GET_ITEMS_BY_LIST:
    // return statePart.map((list) => )
    case REMOVE_ITEM:
      return statePart.filter((item) => item.id !== action.payload);
    case REMOVE_ALL_ITEMS:
      return [];
    default:
      return statePart;
  }
};

export default itemsReducer;
