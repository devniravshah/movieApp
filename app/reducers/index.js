import { combineReducers } from 'redux';
import movieReducer from './movie';
import { RESET_STORE } from '../actions/types';
import { appDefaultReducer } from './defaultReducer';

const appReducer = combineReducers({
    movie: movieReducer,
});

export default function rootReducer(state, action) {
    let finalState = appReducer(state, action);
    if (action.type === RESET_STORE) {
        finalState = appDefaultReducer; // resetReducer(finalState, action);
    }
    return finalState;
}
