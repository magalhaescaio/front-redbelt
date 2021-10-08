import React, { Component } from 'react'

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'

import LocaleContext from './contexts/locale'

import 'react-toastify/dist/ReactToastify.css'


const Home = React.lazy(() => import('./pages/Home'))


class App extends Component {
  	static contextType = LocaleContext

	  
	render() {
		return(
			<BrowserRouter>
				<ToastContainer />

				<React.Suspense>
					<Switch>
						<Route exact path="/" render={props => <Home {...props}/>} />

					</Switch>
				</React.Suspense>
			</BrowserRouter>
		)
	}
}

export default withTranslation()(App)