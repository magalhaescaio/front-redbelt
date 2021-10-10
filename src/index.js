import React from 'react'
import ReactDOM from 'react-dom'

import { LocaleProvider } from './contexts/locale'

import App from './App'

ReactDOM.render(
	<LocaleProvider>
		<App />
	</LocaleProvider>,

	document.getElementById('root')
)