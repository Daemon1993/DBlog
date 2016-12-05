/**
 * Created by Daemon on 2016/12/5 17:36.
 */

import React, {Component} from 'react';

export default class extends Component {

    render() {
        console.log('DemoView render123456');
        return (
            <p style={{fontSize:40}}>
                厉害了 我输入什么 网页就自动更新
                都不用手动点击刷新了
            </p>
        );
    };
}