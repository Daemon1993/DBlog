/**
 * Created by Daemon on 2016/12/8 17:12.
 */

import{createStore,applyMiddleware} from 'redux';

import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/rootReducers';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore() {
    return createStoreWithMiddleware(rootReducer);
}
