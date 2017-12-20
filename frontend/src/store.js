import { createStore, applyMiddleware } from 'redux';

// import the root reducer
import rootReducer from './reducers/index';

import thunk from 'redux-thunk';


// create an object for the default data
const defaultState = {};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;