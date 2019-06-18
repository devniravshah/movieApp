import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
} from 'react-native';
import Constant from '../../helper/themeHelper';
import TabLabelComponent from './topLabel';

export default class TopBar extends React.PureComponent {

    constructor(props){
        super(props);
    }

    labelClicked = (selectedLabel) => {
        if(this.refs.labelList){
            this.props.labelClicked(selectedLabel);
            switch (selectedLabel)
            {
                case "New Showing":
                    this.refs.labelList.scrollTo({x:0,y:0,animated:true});
                    break;
                case "Favourites":
                    this.refs.labelList.scrollTo({x:(Constant.screenWidth/2),y:0,animated:true});
                    break;
            }
        }
    };

    render() {
        const config = {
            velocityThreshold: 0.1,
            directionalOffsetThreshold: 50
        };
        return (
            <View style={{backgroundColor:'#000'}}>
                <ScrollView horizontal={true} scrollEnabled={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            ref="labelList">
                    <TabLabelComponent text="New Showing" labelClicked={this.labelClicked}
                                       isSelected={this.props.countshow === 1}
                                       selectedTab={this.props.countshow} key={1}/>
                    <TabLabelComponent text="Favourites" labelClicked={this.labelClicked}
                                       isSelected={this.props.countshow === 2}
                                       selectedTab={this.props.countshow} key={2}/>
                </ScrollView>
            </View>
        );
    }
}

