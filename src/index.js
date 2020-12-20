import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import App from './App'
import store from './store'

import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    notification: notificationReducer
})

ReactDOM.render(
    <Provider store={store(reducer)}>
    <App />
    </Provider>,
    document.getElementById('root'))