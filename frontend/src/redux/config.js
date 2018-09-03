import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import {i18nState} from 'redux-i18n'
import createHistory from 'history/createBrowserHistory'
import logger from 'redux-logger'
import user from 'redux/modules/user'
import error from 'redux/modules/error'
import post from 'redux/modules/post'


const env=process.env.NODE_ENV;

console.log(env)

const history = createHistory();

const middleWares =[
    thunk,
    routerMiddleware(history)
]

if (env==="development"){
    middleWares.push(logger)
}

const reducer = combineReducers({
    user,
    post,
    error,
    routing :routerReducer,
    i18nState,
})

let store;

if (env==="development") {
    store=intialState => createStore(reducer, composeWithDevTools(applyMiddleware(...middleWares)));
} else {
    store=intialState => createStore(reducer, applyMiddleware(...middleWares));
}

export { history } ;
export default store();
