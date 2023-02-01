//selectors
export const getUser = ({ users }) => users;

/* ACTIONS */

//actions
const reducerName = 'users';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

// actions creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logOut = () => ({
  type: LOG_OUT,
});
/* REDUCER */

export default function usersReducer(statePart = null, action) {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }
}
