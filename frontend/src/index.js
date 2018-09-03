import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import store, { history } from 'redux/config';

//import I18n from 'redux-i18n';
//import {translations} from 'translations';

import App from 'component/App.js';
import './index.css';


//console.log (store.getState())
console.log(history)

ReactDOM.render(
    <Provider store={store}>
         <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);
