import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles.css'
import App from './components/App'
import NotFound from './components/NotFound'
import registerServiceWorker from './registerServiceWorker'

const Root = () => {
	return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
	)
}

ReactDOM.render(<Root/>, document.querySelector('#root'))
registerServiceWorker()