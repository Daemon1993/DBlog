/**
 * Created by Daemon on 2016/12/5 17:36.
 */

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory,IndexRoute,} from 'react-router'

import AppView from './components/HomeView'
import LoginView from './components/LoginView'
import PublishArticle from './components/PublishArticle'
import ArticelDetailView from './components/ArticelDetailView'

import {Provider} from 'react-redux'
import configureStore from './store/config-store'


const store = configureStore();

if (module.hot)
    module.hot.accept();

console.log("Main");


const App = React.createClass({
    render() {
        return (
            <div style={styles.mainDiv}>
                <div style={{display: 'flex',flexDirection:'column',alignItems:'center'}}>
                    <h1><Link to="/">App 厉害了</Link></h1>
                    <div style={{display: 'flex',flex:1}}>
                       <p style={{flex:1,margin:10}}><Link to="/publish">publish</Link></p>
                       <p style={{flex:1,margin:10}}><Link to="/login">login</Link></p>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
});

const styles = {
    mainDiv: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'

    },
};

let index = document.getElementById('index');


render(<Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={AppView}/>
                <Route path="publish" component={PublishArticle}/>
                <Route path="login" component={LoginView}/>
                <Route path="article/:id" component={ArticelDetailView} />
            </Route>
        </Router>
    </Provider>,

    document.getElementById('index'));
