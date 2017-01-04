/**
 * Created by Daemon on 2016/12/5 17:36.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router'

import AppView from './components/AppView'
import PublishArticle from './components/PublishArticle'

import {Provider} from 'react-redux'
import configureStore from './store/config-store'

const store = configureStore();

if (module.hot)
    module.hot.accept();

console.log("Main");


// class AppMain extends Component{
//
//
//
//     render(){
//         return(
//             <div>
//                 <button onClick={()=>}>index</button>
//                 <button>publish</button>
//             </div>
//         );
//     }
// }

let index = document.getElementById('index');

render(<Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={AppView}/>
            <Route path="/publish" component={PublishArticle}/>
        </Router>
    </Provider>,
    document.getElementById('index'));
