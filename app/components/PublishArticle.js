/**
 * Created by Daemon on 2016/12/9 15:39.
 */

import BaseComponent from './BaseComponent';
import React from 'react';

import {saveFile2Dir} from '../utils/FileUtils'
import '../css/markdown10.css'
import '../css/highlight/styles/default.css'

var hljs = require('highlight.js'); // https://highlightjs.org/
var marked = require('marked');


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
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
let bucketHost = 'http://oi0thuu5p.bkt.clouddn.com';

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

    componentWillUnmount() {
        super.log(Tag,'componentWillUnMount')
    }

    textChange(event) {
        console.log('textChange ')
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
                console.log(blob);

                this.uploadImage2QiniuServer(blob,
                    'paste' + ( new Date()).Format('yyyy-MM-dd hh:mm:ss') + ".jpg");

                break;
            }
        }
    }

    drop(e) {
        // 操作系统拖放文件到浏览器需要取消默认行为
        e.preventDefault();

        for (let file of e.dataTransfer.files) {

            if (file && file.type.match('image.*')) {
                if (file.type == 'image/gif') {
                    this.uploadImage2QiniuServer(file,
                        'paste' + ( new Date()).Format('yyyy-MM-dd hh:mm:ss') + ".gif");
                } else {
                    this.uploadImage2QiniuServer(file,
                        'paste' + ( new Date()).Format('yyyy-MM-dd hh:mm:ss') + ".jpg");

                }
            }
        }
    }

    /**
     * 上传到服务器
     * @param image
     * @param fileName
     */
    uploadImage2QiniuServer(image, fileName) {

        console.log('uploadImage2QiniuServer ' + fileName);
        let formData = new FormData();

        formData.append('file', image);
        formData.append('filename', fileName);


        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(res => res.json()).then(result => {
            console.log(result)


            let img='';
            if(result['code']!=0){
                 img = '!['+result['msg']+ ']';
            }else {
                img = '![](' + bucketHost + '/' + result['msg'] + ')';
            }

            insertText(this.refs['textArea'], img)
            // this.refs['textArea'].value=this.refs['textArea'].value+img;
            //
            this.setState({
                resultText: this.refs['textArea'].value,
            });
        }).catch((error) => {
            console.log(error)
            let img = '!['+error+ ']';
            insertText(this.refs['textArea'], img)
            // this.refs['textArea'].value=this.refs['textArea'].value+img;
            //
            this.setState({
                resultText: this.refs['textArea'].value,
            });
        });
    }


    publish() {

        let formData = new FormData();

        formData.append('title', this.state.titleText);
        formData.append('content', this.state.resultText);

        fetch('http://localhost:5000/publish', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(response=>response.text()).then(result=> {
            this._log(result)
        }).catch(error=> {

        });
    }

    login() {
        let formData = new FormData();
        formData.append('username', 'daemon');
        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: formData,
            // mode: "cors",
            credentials: 'include'
        }).then(res => res.text()).then(result => {
            console.log(result)
        }).catch((error) => {
            console.log(JSON.stringify(error))
        });
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
                           onChange={(event) => this.titleChange(event)}/>


                    <button style={styles.btSend} onClick={() => this.publish()}> push-- > 服务器
                    </button >
                    < textarea ref="textArea" style={styles.textareaText} onChange={(event) => this.textChange(event)}
                               onScroll={(event) => this.leftTRScorll(event)}
                               onPaste={(event) => this.textAreaPasteEvent(event)}
                               onDrop={(event) => this.drop(event)}
                               onDragOver={(event) => event.preventDefault()}
                    ></textarea>
                </div>
                <div ref="mdshowdiv" style={styles.rightMdDiv} dangerouslySetInnerHTML={{__html: title + result}}>
                </div>
            </div>

        );
    }

    _log(msg) {
        console.log('PublishArticle ' + msg);
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

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function insertText(obj, str) {
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
        obj.value += str;
    }
}