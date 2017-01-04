/**
 * Created by Daemon on 2016/12/5 17:36.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router,browserHistory,Route} from 'react-router'
import AppView from './components/AppView'
import PublishArticle from './components/PublishArticle'

import {Provider} from 'react-redux'
import configureStore from './store/config-store'

const store = configureStore();

if (module.hot)
    module.hot.accept();

console.log("Main");


let index=document.getElementById('index');
let publish=document.getElementById('publish');

if(index!=null) {
    render(<Provider store={store}>
           <Router history={browserHistory}>
               <Route path="/aaa" component={AppView}/>
           </Router>
        </Provider>,
        document.getElementById('index'));
}


if(publish!=null){
render(<PublishArticle />,
    document.getElementById('publish'));
}