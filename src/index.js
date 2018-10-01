'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import store from './redux/store.js'
import { Provider } from 'react-redux'

import App from './App.js'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('app')
)