import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import './css/global.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { MuiThemeProvider } from 'material-ui/styles'
import { Provider } from 'react-redux'
import {store, persistor} from './store'
import { ConnectedRouter } from 'react-router-redux';
import history from './history'
import theme from './css/MuiTheme.js'
import { PersistGate } from 'redux-persist/integration/react'

const Root = () => {
	return (
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ConnectedRouter history={history}>
						<Route path="/" component={App} />
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		</MuiThemeProvider>
	)
}

ReactDOM.render(<Root/>, document.querySelector('#root'))
registerServiceWorker()
