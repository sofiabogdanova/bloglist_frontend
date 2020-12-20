import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import {Provider, useDispatch} from 'react-redux'
import { combineReducers } from 'redux'
import App from './App'
import store from './store'

import notificationReducer from './reducers/notificationReducer'
import blogReducer, {initializeBlogs} from "./reducers/blogReducer";

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
})

ReactDOM.render(
    <Provider store={store(reducer)}>
    <App />
    </Provider>,
    document.getElementById('root'))