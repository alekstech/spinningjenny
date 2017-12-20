import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import './styles.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './store'
import { ConnectedRouter } from 'react-router-redux';
import history from './history'

const Root = () => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Route path="/" component={App} />
			</ConnectedRouter>
		</Provider>
	)
}

ReactDOM.render(<Root/>, document.querySelector('#root'))
registerServiceWorker()
