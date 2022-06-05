import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

import Color from "../../constants/color";
const Header = props =>{
    return (
        <TouchableOpacity style={styles.header}>
                <Text style={styles.headerTitle}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create(
    {
        header:{
            width:"100%",
            height:110,
            padding:36,
            backgroundColor:Color.primary,
            alignItems:"center",
            justifyContent: "center"
        }
        ,headerTitle:{
            color:"black",
            fontSize:18
        }
    }
);

export default Header;