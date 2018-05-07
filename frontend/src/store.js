import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import the root reducer
import rootReducer from './reducers/index'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// create an object for the default data
const defaultState = {}

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

const persistConfig = {
	key: 'spinningjenny',
	storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, defaultState, composeEnhancers(
	applyMiddleware(thunk)
))

let persistor = persistStore(store)

if(module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default
		store.replaceReducer(nextRootReducer)
	})
}

export { store, persistor }
