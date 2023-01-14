import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import itemsReducer from './itemsRedux';
import listsReducer from './listsRedux';

const subreducers = { lists: listsReducer, items: itemsReducer };

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
