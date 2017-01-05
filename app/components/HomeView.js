/**
 * Created by Daemon on 2016/12/5 17:36.
 */

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import UserInfoView from './UserInfoView'
import ArticleListView from './ArticleListView'
import { Lifecycle } from 'react-router'
import reactMixin from 'react-mixin'

import {log} from '../DConsole'

if (module.hot)
    module.hot.accept();

const Tag = 'HomeView';


class HomeView extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        // this.props.router.setRouteLeaveHook(
        //     this.props.route,
        //     this.routerWillLeave
        // )

    }

    routerWillLeave(nextLocation) {
        console.log('HomeView routerWillLeave将');
        return 'Your work is not saved! Are you sure you want to leave?'
    }

    componentWillUnmount() {
        console.log('HomeView 卸载将');
    }


    componentDidUpdate() {
        console.log('HomeView 更新完毕');
    }

    onclick() {

        this.setState({
            inputText: '',
        });
        ReactDom.findDOMNode(this.refs.input).focus();
    };

    componentWillReceiveProps() {
        log(Tag, 'componentWillReceiveProps');
    }

    componentDidMount() {
        log(Tag, 'componentDidMount');
    }

    shouldComponentUpdate() {
        log(Tag, 'shouldComponentUpdate  ');
        return true;
    }

    componentDidUpdate() {
        log(Tag, 'componentDidUpdate ');
    }


    render() {
        return (
            <div style={styles.mainDiv}>
                <UserInfoView/>
                <ArticleListView />
            </div>
        );
    };
}


export default reactMixin.onClass(HomeView, Lifecycle);



const styles = {
    mainDiv: {
        height: '100%',
        display: 'flex',
    },
};
