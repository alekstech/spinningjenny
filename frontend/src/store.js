import { createStore, applyMiddleware } from 'redux'

// import the root reducer
import rootReducer from './reducers/index'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// create an object for the default data
const defaultState = {}

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

const store = createStore(rootReducer, defaultState, composeEnhancers(
	applyMiddleware(thunk)
))

if(module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default
		store.replaceReducer(nextRootReducer)
	})
}

export default store
