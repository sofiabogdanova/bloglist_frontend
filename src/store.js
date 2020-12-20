import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk'

const store = (reducer) => createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    ))

export default store