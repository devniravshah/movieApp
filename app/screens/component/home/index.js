import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    Text, View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Modal
} from 'react-native';
import Constant from '../../../helper/themeHelper';
import PropTypes from 'prop-types';
import {heightPercentageToDP as hpm, widthPercentageToDP as wpm} from '../../../helper/responsiveScreen';
import { AppNavigation } from "../../common";
import MoveDetails from './movieDetails';
import TopBarComponent from '../topBar'

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            isModalShow: false,
            itemData: null,
            showType: 1
        }
    }

    componentDidMount() {
        this.getMovies();
    }

    getMovies = () => {
        const {handleLocalAction, localActions} = this.props;
        handleLocalAction({type: localActions.MOVIES});
    };

    onMoveSelect = (item) => {
        this.setState({
            isModalShow: true,
            itemData: item
        })
    };

    hideModal = () => {
        this.setState({
            isModalShow: false,
        })
    };

    renderItem = ({item, index}) => {
        const { rowContainer, movieImg } = styles;
        const url = Constant.baseImageUrl + item.poster_path;
        const isLike = this.props.likedMovie.indexOf(item.id) >= 0;
        return(
            <TouchableOpacity style={rowContainer} onPress={()=>this.onMoveSelect(item)}
                              key={index}>
                <Image source={{uri: url}} style={movieImg}/>
                {
                    isLike &&
                    <View style={{top:10, right:10, position:'absolute'}}>
                        <Image source={require('../../../assets/images/heart_icon_full.png')}
                               style={{height:30, width:30}}
                               resizeMode={'contain'}/>
                    </View>
                    || null
                }
            </TouchableOpacity>
        );
    };

    keyExtractor = (item) => {
        return item.id + '';
    };

    renderSeparator = ()=>{
        return <View style={{height:20}}/>;
    };

    renderEmpty = () => {
        return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:15}}>
                    {'No data found'}
                </Text>
            </View>
        );
    };

    onRefresh = () => {
        this.getMovies();
    };

    onLikePress = () => {
        const { itemData } = this.state;
        const {handleLocalAction, localActions} = this.props;
        handleLocalAction({type: localActions.LIKES, payload: itemData });
    };

    labelClicked = (selectedLabel) => {
        switch (selectedLabel)
        {
            case "New Showing":
                this.setState({
                    showType:1
                });
                break;
            case "Favourites":
                this.setState({
                    showType:2
                });
                break;
        }
    };

    getDisplayList = () => {
        const {movieList, likedMovie} = this.props;
        let favoriteList = [];
        if(this.state.showType === 2){
            movieList.map(obj => {
                if(likedMovie.includes(obj.id)){
                    favoriteList.push(obj);
                }
            });
            return favoriteList;
        }else{
            return movieList;
        }
    };

    render() {
        const {fetching, likedMovie} = this.props;
        const {itemData, isModalShow, showType} = this.state;
        const movieList = this.getDisplayList();
        return (
            <SafeAreaView style={styles.container}>
                <AppNavigation title={'Movies'}/>
                <TopBarComponent labelClicked={this.labelClicked}
                                 countshow={showType}/>
                <FlatList data={movieList}
                          contentContainerStyle={{top:20}}
                          automaticallyAdjustContentInsets={false}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                          ItemSeparatorComponent={this.renderSeparator}
                          ListEmptyComponent={this.renderEmpty}
                          onRefresh={this.onRefresh}
                          refreshing={fetching}
                          extraData={likedMovie}
                          ListFooterComponent={<View style={{ height: 50}}/>}
                />
                <Modal animationType="slide"
                       transparent={false}
                       visible={isModalShow}
                       onRequestClose={this.hideModal}>
                    <MoveDetails hideModal={this.hideModal}
                                 onLikePress={this.onLikePress}
                                 isLike={(itemData) && likedMovie.indexOf(itemData.id) >= 0 || false}
                                 item={itemData}
                    />
                </Modal>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    titleText: {
        fontSize: Constant.fontSize.small,
        marginBottom: 20
    },
    rowContainer: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        borderRadius: 15,
        alignSelf:'center',
        width: wpm('90%'),
        height: hpm('50%'),
        backgroundColor: '#000',
        overflow:'hidden'
    },
    movieImg: {
        height: '100%',
        width: '100%'
    }
});

Home.defaultProps = {
    movieList: [],
    fetching: false,
};

Home.propTypes = {
    movieList: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired
};