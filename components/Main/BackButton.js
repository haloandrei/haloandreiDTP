import React, {useEffect, useRef, useState} from "react";
import Svg, {Line, SvgXml} from "react-native-svg";
import SvgLoader from "../SvgLoader";
import {Animated, StyleSheet, View} from "react-native";
import color from "../../constants/color";

const BackButton = (props) => {

    const pressHandler = () => {
        props.closeScheduler(false);
    }

    const hamburgerMenu = <Svg width="100%" height="100%" onPress={pressHandler}>
        <Line x1="10%" y1="50%" x2="90%" y2="50%" stroke={color.menuButtons} strokeWidth="20%" strokeLinecap="round"/>
        <Line x1="10%" y1="50%" x2="30%" y2="30%" stroke={color.menuButtons} strokeWidth="20%" strokeLinecap="round"/>
        <Line x1="10%" y1="50%" x2="30%" y2="70%" stroke={color.menuButtons} strokeWidth="20%" strokeLinecap="round"/>
    </Svg>


    return <View style={styles.absolute} >
        {hamburgerMenu}
    </View>
};

const styles = StyleSheet.create({
    absolute:{
        position: "absolute",
        left: 7,
        right: 0,
        top: 7,
        bottom: 0,
        width:40,
        height:40,
        elevation:7,
    }
})

export default BackButton;