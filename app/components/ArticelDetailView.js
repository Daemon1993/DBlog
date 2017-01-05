/**
 * Created by Daemon1993 on 17/1/4.
 */

import React, {Component} from 'react';

export default class ArticelDetailView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            id:this.props.params.id,
        };

      }
    componentDidMount() {
        console.log('  ADV componentDidMount '+this.props.params.id);
    }

    componentDidUpdate (prevProps) {
        console.log('  ADV componentDidUpdate');


    }


    render(){
        return(
            <div style={{fontSize:30}}>
                {this.state.id}
            </div>
        );
    }
}
