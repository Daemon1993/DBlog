/**
 * Created by Daemon on 2016/12/8 14:45.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import  BaseComponent from './BaseComponent'


const Tag = 'UserInfoView';

export default class UserInfoView extends BaseComponent {

    static propTypes = {
        //json 字典 用户对象
        userBean: PropTypes.object,
        loadData: PropTypes.func,
    };

    render() {
        super.log(Tag, 'render123');

        let srcimg = require('../imgs/hom.jpg');

        return (
            <div style={styles.mainDivLeft}>
                <img src={srcimg} style={styles.mainDivIcon}/>
                <div>
                    <p>111{this.props.name}</p>
                    <p>222</p>
                    <p>也许更多</p>
                </div>
            </div>
        );
    }
}

const styles = {
    mainDivLeft: {
        backgroundColor: '#e8e8e8',
        flexDirection: 'column',
        display: 'inline-flex',
        flex:2,
        alignItems:'center',
        padding:20,
        borderRadius:10,
        margin:10,

    },
    mainDivIcon: {
        height: 100,
        borderRadius: 50,
        margin: 10,
        width: 100,
        marginTop:'50%'
    },
};

