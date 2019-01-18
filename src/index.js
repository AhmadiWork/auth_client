import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css';
import {IntlProvider} from "react-intl";
import {addLocaleData} from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_fa from 'react-intl/locale-data/fa';

import localeData from './translation/localeData'
import reducers from './redux/reducers'
import App from './components/App'
import {IS_AUTHENTICATED_PER, IS_NOT_AUTHENTICATED_PER} from "./config/permission/types";


/**
 * Redux store, middleware and devtools
 */
// Redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Pre loaded state
const token = localStorage.getItem('token');
let preLoadedState = {};
if (token) {
    preLoadedState = {
        auth: {
            authenticated: token,
            permissions: [IS_AUTHENTICATED_PER]
        }
    };
} else {
    preLoadedState = {
        auth: {
            permissions: [IS_NOT_AUTHENTICATED_PER]
        }
    };
}

// Redux store and middleware
const store = createStore(
    reducers,
    preLoadedState,
    composeEnhancers(applyMiddleware(reduxThunk))
);


/**
 * Translation (i18n) (react-intl)
 */
addLocaleData([...locale_en, ...locale_fa]);
const locale = 'en';

// Export react-intl (for use in out of components)
export const {intl} = new IntlProvider({locale: locale, messages: localeData[locale]}, {}).getChildContext();


/**
 * Render App
 */
ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={locale} messages={localeData[locale]}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </IntlProvider>
    </Provider>,
    document.querySelector('#root')
);