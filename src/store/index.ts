/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/2/26 14:38
 */
import { composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import reduxThunk from 'redux-thunk'
import reducer from './reducers'
// const store = createStore(reducer, applyMiddleware(reduxThunk));
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxThunk)));
export default store
