import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import App from './containers/App.jsx'

require("!style!css!sass!./styles/entry.scss")

const store = configureStore()

render(
    <Provider store={store}>
    <App/>
</Provider>, document.getElementById('app'))
