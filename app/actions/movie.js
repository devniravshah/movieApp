import { MOVIE_LIST, SET_PROGRESS, SET_LIKED_MOVIE } from './types';
import { makeRequest } from '../api/apiCall';
import { setAsyncStorage, showAPICallError } from '../helper/appHelper';
import APIConstant from '../api/apiConstant';
import { cloneDeep } from "lodash";

//Get movie details
export const getMovieDetail = (emailId, password) => {
    return (dispatch) => {
        dispatch({
            type: SET_PROGRESS,
            payload: true
        });
        return makeRequest(APIConstant.BASE_URL + APIConstant.MOVIE_LIST + APIConstant.API_KEY,
            'get')
            .then((response) => {
                if(response && response.items) {
                    return dispatch({
                        type: MOVIE_LIST,
                        payload: response.items
                    });
                }else{
                    dispatch({
                        type: SET_PROGRESS,
                        payload: false
                    });
                }
            })
            .catch ((error) =>{
                dispatch({
                    type: SET_PROGRESS,
                    payload: false
                });
                return dispatch(apiErrorHandler(error));
            });
    };
};

//Manage Likes here
export const manageLikes = (item) => {
    return (dispatch, getState) => {
        let likedMovie = getState().movie.likedMovie || [];
        let index = likedMovie.indexOf(item.id);
        if(index < 0){
            likedMovie.push(item.id);
        }else{
            likedMovie.splice(index,1);
        }
        return dispatch({
            type: SET_LIKED_MOVIE,
            payload: cloneDeep(likedMovie)
        });
    };
};


//Global error handling
export const apiErrorHandler = (error) =>{
    return () =>{
        console.log("-----------Error-----------");
        console.log(error);
        if (__DEV__){
            alert(JSON.stringify(error))
        }
        if (error && typeof error === 'object' && error.response){
            if (error.response && error.response.status){
                let errorCode = error.response.status;
                switch (errorCode){
                    case 401:
                        //Authentication error
                        //redirect to login
                        return;
                    case 403:
                        break;
                    case 500:
                    case 501:
                    case 502:
                    case 503:
                    case 504:
                    case 505:
                    case 506:
                    case 507:
                    case 508:
                    case 509:
                    case 510:
                    case 520:
                    case 521:
                    case 522:
                    case 523:
                    case 524:
                    case 525:
                    case 526:
                    case 527:
                    case 530:
                        showAPICallError({
                            title: "Uh oh",
                            message: "We’re fixing an issue with our server. Please try again in a little while." + "(Error " + errorCode + ")",
                            leftBtn: "OK"});
                        break;
                    default:
                        showAPICallError({
                            title: "Uh oh",
                            message: "Hmm something has gone wrong on our end. We should have this fixed soon.",
                            leftBtn: "OK"});
                        break;
                }
            }
        }else {
            //Check for internet connection
        }
        return Promise.reject(error);
    };
};