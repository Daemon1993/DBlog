const LOAD_DATA = 'LOAD_DATA';
const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
const LOAD_DATA_FAILED = 'LOAD_DATA_FAILED';

//const API = 'http://android-gems.com/api/mdcc';
const API = 'http://112.74.207.72:8888/getDataJson';

const initialState = {
    loading: true,
    datas: []
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state,
                datas: [],
                loading: true,
            };
        case LOAD_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                datas: action.datas,
            };
        case LOAD_DATA_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

function action_data_ok(datas) {
    return {
        type: LOAD_DATA_SUCCESS,
        datas: datas,
    }
}


export function loadData() {

    console.log('loadData');

    //数据加载
    return dispatch=>fetch(API).then((response)=>response.json())
        .then((responseJson)=> {
            try {
                let lists = [];
                for (let data1 of responseJson['data']['list']) {
                    for(let data2 of data1) {
                        for (let data3 of data2['topics']) {
                            lists.push(data3);
                        }
                    }
                }

                dispatch(action_data_ok(lists));
            } catch (e) {
                console.log(e);
            }
        }).catch((error)=> {
            console.log(error);
        });

}