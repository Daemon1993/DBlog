/**
 * Created by Daemon on 2016/12/5 17:36.
 */

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import UserInfoView from './UserInfoView'
import DirectoryContentView from './DirectoryContentView'

import {log} from '../DConsole'

if (module.hot)
    module.hot.accept();

const Tag = 'AppView';

export default class AppView extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
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
                <DirectoryContentView />
            </div>
        );
    };
}

const styles = {
    mainDiv: {
        height: '100%',
        display: 'flex',
    },
};
