/**
 * Created by Daemon on 2016/12/5 17:36.
 */

import React, {Component} from 'react';
import ReactDom from 'react-dom';

import {log} from '../DConsole'

if (module.hot)
    module.hot.accept();

const Tag = 'AppView';

export default class extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            inputText: '',
        };
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
        log(Tag, 'shouldComponentUpdate');
        return true;
    }

    componentDidUpdate() {
        log(Tag, 'componentDidUpdate');
    }


    render() {


        let srcimg = require('../imgs/hom.jpg');

        log(Tag, 'render  hahah ' + srcimg);


        return (
            <div style={styles.mainStyles}>
                <img src={srcimg} style={styles.iconStyles}/>
                <img src={srcimg} style={styles.iconStyles}/>
                <img src={srcimg} style={styles.iconStyles}/>
                <img src={srcimg} style={styles.iconStyles}/>


                <input type="text" ref='input' value={this.state.inputText} onChange={(event)=> {

                    this.setState({
                        inputText: event.target.value,
                    });
                }}/>
                <input type="button" value='clear' onClick={()=>this.onclick()}/>
            </div>
        );
    };
}

const styles = {
    mainStyles: {
        backgroundColor: 'red',
        padding:10,
        flexDirection:'column',
        borderRadius:10,
        display: 'inline-flex',
        alignItems:'center'
},
    iconStyles:{
        width:100,
        height:100,
        borderRadius:50,
        margin:10,
    }


};
