/**
 * Created by Daemon on 2016/12/9 15:39.
 */

import BaseComponent from './BaseComponent';
import React from 'react';
import {saveFile2Dir} from '../utils/FileUtils'


var hljs = require('highlight.js'); // https://highlightjs.org/
var marked = require('marked');


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,

    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {
            }
        }

        try {
            return hljs.highlightAuto(str).value;
        } catch (__) {
        }

        return ''; // use e
    }
});


const Tag = "PublishArticle";

export default class PublishArticle extends BaseComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            resultText: '',
            titleText: '',
        };
        let title = document.getElementsByTagName('title')[0];
        title.text = 'DBlog 编辑器';
    }

    textChange(event) {
        this.setState({
            resultText: event.target.value,
        });

    }

    titleChange(event) {
        this.setState({
            titleText: event.target.value,
        });
    }

    leftTRScorll(event) {

        if (event.target.scrollHeight - event.target.clientHeight == event.target.scrollTop) {
            super.log(Tag, '底部');
            this.refs['mdshowdiv'].scrollTop = this.refs['mdshowdiv'].scrollHeight - this.refs['mdshowdiv'].clientHeight;
            return;
        }
        let mdDivHeight = this.refs['mdshowdiv'].scrollHeight;
        let textAreaHeight = this.refs['textArea'].scrollHeight;
        let scaleSize = mdDivHeight / textAreaHeight;

        if (scaleSize > 1) {
            scaleSize = scaleSize * 0.8;
        }

        this.refs['mdshowdiv'].scrollTop = event.target.scrollTop * scaleSize;
    }

    /**
     * 截图 保存 生成jpg存在本地缓存目录下
     * 之后一起上传后本地缓存文件清空
     * @param e
     */
    textAreaPasteEvent(e) {

        var cbd = e.clipboardData;
        var ua = window.navigator.userAgent;

        // 如果是 Safari 直接 return
        if (!(e.clipboardData && e.clipboardData.items)) {
            return;
        }

        // Mac平台下Chrome49版本以下 复制Finder中的文件的Bug Hack掉
        if (cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
            cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
            ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49) {
            return;
        }

        for (var i = 0; i < cbd.items.length; i++) {
            var item = cbd.items[i];
            if (item.kind == "file") {
                var blob = item.getAsFile();
                if (blob.size === 0) {
                    return;
                }
                this.uploadImage2QiniuServer(blob, 'paste' + ( new Date()).valueOf() + ".jpg");

                // // blob 就是从剪切板获得的文件 可以进行上传或其他操作
                // let reader = new FileReader();
                //
                //
                // // 读取文件后将其显示在网页中
                // reader.onload = (e)=>this.cbdCallBackOk(e);
                //
                // // 读取文件
                // reader.readAsDataURL(blob);
                break;
            }
        }
    }

    /**
     * 上传到七牛服务器
     * @param image
     * @param fileName
     */
    uploadImage2QiniuServer(image, fileName) {
    }


    cbdCallBackOk(e) {
        let mdImage = '![](' + e.target.result + ')';
        this.setState({
            resultText: this.state.resultText + mdImage,
        });
        //saveFile2Dir(e.target.result,'paste'+'.jpg');
    }

    render() {

        let title = marked('# ' + this.state.titleText);
        let result = marked(this.state.resultText);
        //
        // super.log(title + result);

        return (
            <div style={styles.divMain}>
                <div style={styles.leftMdDiv}>
                    <input type="text" placeholder="输入文章标题" style={styles.titleStyle}
                           onChange={(event)=>this.titleChange(event)}/>

                    <svg width="400" height="100" style={{backgroundColor: '#123456', padding: 50}}>
                        <defs>
                            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#05a"/>
                                <stop offset="100%" stopColor="#0a5"/>
                            </linearGradient>
                        </defs>

                        <path d="M25,0
 A25,25 0 0,1 25,50" style={{"stroke": "url(#linear)", "fill": "none", strokeWidth: "5"}}/>

                        <path d="M25,50
 A25,25 0 0,1 25,0" style={{"stroke": "url(#linear)", "fill": "none", strokeWidth: "5"}}/>

                    </svg>


                    <button style={styles.btSend}>push-->服务器</button>
                    <textarea ref="textArea" style={styles.textareaText} onChange={(event)=>this.textChange(event)}
                              onScroll={(event)=>this.leftTRScorll(event)}
                              onPaste={(event)=>this.textAreaPasteEvent(event)}></textarea>
                </div>
                <div ref="mdshowdiv" style={styles.rightMdDiv} dangerouslySetInnerHTML={{__html: title + result}}>
                </div>
            </div>

        );
    }
}

const styles = {
    divMain: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
    },

    textareaText: {
        padding: 20,
        fontSize: 16,
        flex: 1,
    },
    leftMdDiv: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
    },
    titleStyle: {
        padding: 15,
        fontSize: '2em',
    },
    rightMdDiv: {
        flex: 1,
        padding: 20,
        margin: 10,
        overflow: 'scroll'
    },
    btSend: {
        padding: 10,
        alignSelf: 'flex-end',
        margin: '10px 0',
    }


};