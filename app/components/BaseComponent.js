/**
 * Created by Daemon on 2016/12/8 15:24.
 */
import {Component} from 'react';

/**
 * 自带log方法 子类调用super.dlog()
 */
export default class BaseComponent extends Component {
    log(Tag, masg) {
        console.log(Tag + ' --> ' + masg);
    };
}

