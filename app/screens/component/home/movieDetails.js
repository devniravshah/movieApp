import React  from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Constant from '../../../helper/themeHelper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../helper/responsiveScreen';

const MoveDetails = (props) => {
    const {item,isLike,hideModal,onLikePress} = props;
    const {poster_path, overview,
        release_date, original_title,
        backdrop_path } = item;
    const url = Constant.baseImageUrl + poster_path;
    const { label, title, subTitle, dateStyle } = styles;
    return(
        <View style={{flex:1}}>
            <ScrollView style={{flex:1}}>
                <Image style={{height:hp('60%'), width: wp('100%') }}
                       source={{uri:url}}/>
                <View style={{width:wp('90%'), alignSelf:'center'}}>
                    <Text style={title}>
                        {original_title}
                    </Text>
                    <Text style={label}>
                        {'Release date'}
                    </Text>
                    <Text style={dateStyle}>
                        {release_date}
                    </Text>

                    <Text style={label}>
                        {'Overview'}
                    </Text>
                    <Text style={subTitle}>
                        {overview}
                    </Text>
                    <Text>
                        {release_date}
                    </Text>
                </View>
            </ScrollView>
            <View style={{flexDirection:'row', justifyContent:'space-between',top:50,
                left:20, right:20, position:'absolute'}}>
                <TouchableOpacity onPress={hideModal}>
                    <Image source={require('../../../assets/images/back_button_rounded.png')}
                           style={{tintColor: '#fff', height:30, width:30}}
                           resizeMode={'contain'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={onLikePress}>
                    {
                        isLike &&
                        <Image source={require('../../../assets/images/heart_icon_full.png')}
                               style={{height:30, width:30}}
                               resizeMode={'contain'}/>
                               ||
                        <Image source={require('../../../assets/images/heart_icon_empty.png')}
                               style={{tintColor: '#fff', height:30, width:30}}
                               resizeMode={'contain'}/>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    label:{
        color:Constant.color.blackColor,
        fontSize:Constant.fontSize.medium,
        fontWeight: '600',
        marginBottom: 5
    },
    title:{
        color:Constant.color.blackColor,
        fontSize:Constant.fontSize.large,
        fontWeight: '800',
        marginVertical:20
    },
    subTitle:{
        color:Constant.color.lightGray,
        fontSize:Constant.fontSize.large,
        fontWeight: '500'
    },
    dateStyle:{
        color:Constant.color.blackColor,
        fontSize:Constant.fontSize.large,
        fontWeight: '600',
        marginBottom: 10,

    }
});

export default MoveDetails;
