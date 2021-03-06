/**
 * Created by Daemon on 2016/12/8 14:59.
 */


import  BaseComponent from './BaseComponent'
import  React, {PropTypes} from 'react'
import  {connect} from 'react-redux'
import  {loadData} from '../reducers/data'
import  {Link} from 'react-router'

if (module.hot)
    module.hot.accept();

const Tag = 'ArticleListView';

class ArticleListView extends BaseComponent {

    static propTypes = {
        loadData: PropTypes.func,
        data: PropTypes.array,

    };

    componentWillReceiveProps(nextProps) {
        if(this.props.data==nextProps.data){
            return;
        }

        super.log(Tag, 'componentWillReceiveProps ');

    }

    componentDidMount() {
        super.log(Tag, 'componentDidMount');
        this.props.loadData();
    }

    go2Detail(data){
        super.log(Tag,data['id']);
    }


    render() {
        super.log(Tag, 'render');

        let titles = [];
        let index = 0;

        for (let data of this.props.data) {
            if(data['topic_intro']==null || data['topic_intro']==''){
                continue;
            }

            titles.push(
                // {/*<p key={index} style={styles.titleP}>{data['topic_intro']}</p>*/}
                <div key={index} style={styles.titleM}>
                    <Link to={"/article/"+data['id']}><p style={styles.titleP} >{data['title']}</p></Link>
                </div>

            );
            index++;
        }
        return (
            <div style={styles.mainDivContent}>
                {titles}
            </div>
        );
    }
}


const styles = {
    mainDivContent: {
        backgroundColor: '#e8e8e8',
        display: 'flex',
        margin: 10,
        flexDirection: 'column',
        flex: 8,
        overflow: 'scroll',
        borderRadius:10,
    },

    titleP: {
        flexWrap: 'nowrap',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontFamily:'微软雅黑',
        fontSize:'1.5em',
        cursor:'pointer',
        flex:1,
        textAlign:'center'
    },

    titleM: {
        backgroundColor: '#ffffff',
        margin:10,
        borderRadius:10,
        padding:10,
    }
};

const mapstateToProps = state=>({
    data: state.data.datas,
});

const mapDispatchToProps = (dispatch, props)=> {
    return {
        loadData: ()=>dispatch(loadData()),

    }
};

module.exports = connect(mapstateToProps, mapDispatchToProps)(ArticleListView);