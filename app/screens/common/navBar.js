import React  from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Constant from '../../helper/themeHelper';

const AppNavigation = (props) => {
    const {vwOuter,titleText} = styles;
    const {title, onPress} = props;
    return(
        <View style={vwOuter}
                          onPress={onPress}>
            <Text style={titleText}>
                {title}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    vwOuter:{
        alignItems:'center',
        justifyContent:'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#bdbdbd'
    },
    titleText:{
        color:Constant.color.blackColor,
        fontSize:Constant.fontSize.large,
        fontWeight: 'bold'
    }
});

export {AppNavigation};
