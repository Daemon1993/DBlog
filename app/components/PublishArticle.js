/**
 * Created by Daemon on 2016/12/9 15:39.
 */

import BaseComponent from './BaseComponent';
import React from 'react';
import {Editor, EditorState} from 'draft-js';


const Tag = "PublishArticle";
export default class PublishArticle extends BaseComponent {


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            editorState: EditorState.createEmpty(),
            resultText: '',
        };
    }

    textChange(event) {
        this.setState({
            resultText: event.target.value,
        });
    }

    render() {
        super.log(Tag, "render");

        return (
            <div style={styles.divMain}>
                <textarea style={styles.textareaText} onChange={(event)=>this.textChange(event)}/>

            </div>

        );
    }
}

const styles = {
    divMain: {
        display: 'flex',
        minHeight: 800,
    },
    textareaText: {
        flex: 1,
        padding: 20,
        fontSize: 16,
    },
    rightMdDiv: {
        flex: 1,
        marginLeft: 5,
    }
};