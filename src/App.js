import React, { Component } from 'react'

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'antd/dist/antd.css'
import './assets/styles/global.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Home = React.lazy(() => import('./pages/Home'))

class App extends Component {
	render() {
		return(
			<>
				<BrowserRouter>
					<ToastContainer />

					<React.Suspense fallback={<></>}>
						<Switch>
							<Route exact path="/" render={props => <Home {...props}/>} />

						</Switch>
					</React.Suspense>
				</BrowserRouter>
			</>
		)
	}
}

export default withTranslation()(App)