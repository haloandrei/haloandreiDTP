import React, {useEffect, useRef, useState} from "react";
import Svg, {Line, SvgXml} from "react-native-svg";
import SvgLoader from "../SvgLoader";
import {Animated, StyleSheet, View} from "react-native";
import color from "../../constants/color";

const SideMenu = (props) => {
    //
    const [open,setOpen] = useState(false);
    const [y2Line,setY2Line] = useState(50);

    // let line1posY2= useRef(new Animated.Value(50)).current;
    // let line2posY2= useRef(new Animated.Value(50)).current;
    //
    // useEffect(()=>{
    //     let listenerAnim = line1posY2.addListener((value)=> {
    //         setY2Line(value.toString() + "%");
    //         console.log(value.toString() + "%")
    //     })
    //     console.log("BAAA")
    //
    //     open ? Animated.timing(
    //         line1posY2,
    //         {
    //             toValue: 90,
    //             duration: 1000,
    //             useNativeDriver: true,
    //         }
    //     ).start() :  Animated.timing(
    //         line1posY2,
    //         {
    //             toValue: 50,
    //             duration: 1000,
    //             useNativeDriver: true,
    //         }
    //     ).start()
    //
    //     return () => line1posY2.removeListener(listenerAnim)
    // }, [line1posY2, open])

    const pressHandler = () => {
        if (!open) { //need to use the previous frame value until it updates
            setY2Line(90);
            props.showMenu();
        }
        else {
            setY2Line(50);
            props.closeMenu();
        }
        setOpen(!open);

    }

    const hamburgerMenu = <Svg width="100%" height="100%" onPress={pressHandler}>
        <Line x1="10%" y1="10%" x2="90%" y2="10%" stroke={color.menuButtons} strokeWidth="20%" strokeLinecap="round"/>
        <Line x1="10%" y1="50%" x2="90%" y2={y2Line.toString()+"%"} stroke={color.menuButtons} strokeWidth="20%" strokeLinecap="round"/>
        <Line x1="10%" y1="90%" x2="90%" y2={(90-y2Line+50).toString()+"%"} stroke={color.menuButtons} strokeWidth="20%" strokeLinecap="round"/>
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

export default SideMenu;