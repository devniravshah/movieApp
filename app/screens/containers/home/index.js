import { connect } from 'react-redux';
import { getMovieDetail, manageLikes } from '../../../actions/movie';
import MovieComponent from '../../component/home/index';

const handleLocalAction = (dispatch, action, navigation) => {
    const { type, payload } = action;
    switch (type) {
        case localActions.MOVIES:
            dispatch(getMovieDetail());
            break;
        case localActions.LIKES:
            dispatch(manageLikes(payload));
            break;
        default: break;
    }
};

export const localActions = {
    MOVIES: 'MOVIES',
    LIKES: 'LIKES'
};

const mapStateToProps = (state) => {
    const { movieList, likedMovie } = state.movie;
    return {
        localActions,
        movieList,
        likedMovie
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocalAction: (actionType, navigation) => handleLocalAction(dispatch, actionType, navigation)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieComponent);
