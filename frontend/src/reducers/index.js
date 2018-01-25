import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import user from './user'
import ui from './ui'

const rootReducer = combineReducers({ui, user, routing: routerReducer })

export default rootReducer
