/**
 * Created by Daemon on 2016/12/8 14:59.
 */


import  BaseComponent from './BaseComponent'
import  React, {PropTypes} from 'react'
import  {connect} from 'react-redux'
import  {loadData} from '../reducers/data'

if (module.hot)
    module.hot.accept();

const Tag = 'DirectoryContentView';


class DirectoryContentView extends BaseComponent {

    static propTypes = {
        loadData: PropTypes.func,
        data: PropTypes.array,

    };

    componentWillReceiveProps(nextProps) {
        super.log(Tag, 'componentWillReceiveProps ');

    }

    componentDidMount() {
        super.log(Tag, 'componentDidMount');
        this.props.loadData();
    }

    render() {
        super.log(Tag, 'render');

        let titles = [];
        let index = 0;

        for (let data of this.props.data) {
            titles.push(
                <p key={index} style={styles.titleP}>{data['title']}</p>
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
        backgroundColor: '#147852',
        display: 'flex',
        margin: 10,
        borderRadius: 10,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    titleP:{
        textOverflow:'ellipsis',
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

module.exports = connect(mapstateToProps, mapDispatchToProps)(DirectoryContentView);