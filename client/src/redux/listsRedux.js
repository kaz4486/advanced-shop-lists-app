import { API_URL } from '../config/config';
import axios from 'axios';

//selectors

export const getLists = ({ lists }) => lists.data;

export const getRequest = ({ lists }) => lists.request;

export const getListById = ({ lists }, listId) =>
  lists.data.find((list) => list._id === listId);

//actions

const reducerName = 'lists';

const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_LISTS = createActionName('LOAD_LISTS');
const CREATE_LIST = createActionName('CREATE_LIST');
const EDIT_LIST = createActionName('EDIT_LIST');
const REMOVE_LIST = createActionName('REMOVE_LIST');

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = () => ({ type: ERROR_REQUEST });

export const loadLists = (payload) => ({ type: LOAD_LISTS, payload });
export const createList = (payload) => ({ type: CREATE_LIST, payload });
export const editList = (payload) => ({ type: EDIT_LIST, payload });
export const removeList = (payload) => ({ type: REMOVE_LIST, payload });

//thunks
export const loadListsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: LOAD_LISTS }));
    try {
      let res = await axios.get(`${API_URL}/lists`);
      console.log(res.data);
      dispatch(loadLists(res.data));
      dispatch(endRequest({ name: LOAD_LISTS }));
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const createListRequest = (data) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: CREATE_LIST }));
    try {
      let res = await axios.post(
        `${API_URL}/lists`,
        data,
        { withCredentials: true },
        { headers: { 'Content-Type': 'text/html' } }
      );

      dispatch(createList(res.data));
      dispatch(endRequest({ name: CREATE_LIST }));
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

const initialState = {
  data: [],
  request: { pending: false, error: null, success: null },
};

const listsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_LISTS:
      return { ...statePart, data: [...action.payload] };
    case CREATE_LIST:
      return { ...statePart, data: [...statePart.data, ...action.payload] };
    case START_REQUEST:
      return {
        ...statePart,
        request: { pending: true, error: null, success: null },
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: null, success: true },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: true, success: true },
      };
    default:
      return statePart;
  }
};

export default listsReducer;
