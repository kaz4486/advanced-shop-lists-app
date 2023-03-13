import { API_URL } from '../config/config';
import axios from 'axios';

//selectors

export const getLists = ({ lists }) => lists.data;

export const getRequest = ({ lists }) => lists.request;

export const getListById = ({ lists }, listId) =>
  lists.data.find((list) => list._id === listId);

export const getListByUser = ({ lists }, userId) =>
  lists.data.find((list) => list.user === userId);

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
      dispatch(loadLists(res.data));
      dispatch(endRequest({ name: LOAD_LISTS }));
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadListsByUserRequest = (login) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: LOAD_LISTS }));
    try {
      let res = await axios.get(`${API_URL}/lists/${login}`);
      dispatch(loadLists(res.data));
      dispatch(endRequest({ name: LOAD_LISTS }));
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const createListRequest = (data) => {
  console.log(data);

  return async (dispatch) => {
    dispatch(startRequest({ name: CREATE_LIST }));
    try {
      let res = await axios.post(
        `${API_URL}/lists`,
        data,
        { withCredentials: true },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(res);

      dispatch(createList(res.data));
      dispatch(endRequest({ name: CREATE_LIST }));
    } catch (e) {
      dispatch(errorRequest({ name: CREATE_LIST, error: e.message }));
    }
  };
};

export const editListRequest = (data, id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: EDIT_LIST }));
    try {
      let res = await axios.patch(
        `${API_URL}/lists/${id}`,
        { name: data.name, items: data.items, user: data.user },
        { withCredentials: true },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(res.data.modifiedList);
      await dispatch(editList(res.data.modifiedList));
      dispatch(endRequest({ name: EDIT_LIST }));
    } catch (e) {
      dispatch(errorRequest({ name: EDIT_LIST, error: e.message }));
    }
  };
};

export const removeListRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: REMOVE_LIST }));
    try {
      await axios.delete(
        `${API_URL}/lists/${id}`,
        { withCredentials: true },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      await dispatch(removeList(id));
      dispatch(endRequest({ name: REMOVE_LIST }));
    } catch (e) {
      dispatch(errorRequest({ name: REMOVE_LIST, error: e.message }));
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
      return { ...statePart, data: [...statePart.data, action.payload] };
    case EDIT_LIST:
      return {
        ...statePart,
        data: [
          statePart.data.map((list) =>
            list._id === action.payload._id
              ? { ...list, ...action.payload }
              : list
          ),
        ],
      };
    case REMOVE_LIST:
      return {
        ...statePart,
        data: statePart.data.filter((list) => list._id !== action.payload._id),
      };

    case START_REQUEST:
      return {
        ...statePart,
        request: { pending: true, error: null, success: null },
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: false, success: true },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: action.error, success: false },
      };
    default:
      return statePart;
  }
};

export default listsReducer;
