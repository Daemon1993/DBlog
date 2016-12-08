/**
 * Created by Daemon on 2016/12/5 17:36.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';

import AppView from './components/AppView'
import {Provider} from 'react-redux'
import configureStore from './store/config-store'

const store = configureStore();

if (module.hot)
    module.hot.accept();


render(
    <Provider store={store}>
        <AppView />

    </Provider>,
    document.getElementById('content'));
