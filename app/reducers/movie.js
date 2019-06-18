import {
    MOVIE_LIST,
    SET_PROGRESS,
    SET_LIKED_MOVIE
} from '../actions/types';
import { appDefaultReducer } from './defaultReducer';

const INITIAL_STATE = appDefaultReducer.movie;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MOVIE_LIST: {
            return {
                ...state,
                movieList: action.payload,
                fetching: false
            };
        }
        case SET_PROGRESS: {
            return {
                ...state,
                fetching: action.payload
            };
        }
        case SET_LIKED_MOVIE: {
            return {
                ...state,
                likedMovie: action.payload
            };
        }
        default:
            return state;
    }
};
