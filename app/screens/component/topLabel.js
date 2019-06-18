import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import Constant from '../../helper/themeHelper';
import * as Animatable from 'react-native-animatable';

export default class TabLabelComponent extends React.PureComponent {

    constructor(props){
        super(props);
    }

    clicked = () => {
        this.refs.vwImg.pulse(400);
        setTimeout(()=>{
            this.props.labelClicked(this.props.text);
        },10);
    };

    render() {
        return (
            <Animatable.View ref="vwImg">
                <TouchableHighlight onPress={()=>{this.clicked();}}
                                    style={{width:Constant.screenWidth/2, paddingTop: 10,paddingBottom:15}}
                                    underlayColor={'transparent'}>
                    <View style={{alignItems:'center'}}>
                        <Text style={{ fontSize:15,fontWeight:'900', color: this.props.isSelected &&
                                Constant.color.lightblue || Constant.color.white,paddingTop:15,alignSelf: 'center'}}>
                            {this.props.text || ""}
                        </Text>
                    </View>
                </TouchableHighlight>
            </Animatable.View>
        );
    }
}