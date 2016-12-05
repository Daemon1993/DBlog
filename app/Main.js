/**
 * Created by Daemon on 2016/12/5 17:36.
 */

import React,{Component} from 'react';
import {render} from 'react-dom';

import DemoView from './components/DemoView'

if(module.hot)
    module.hot.accept();

render(<DemoView />, document.getElementById('content'));
