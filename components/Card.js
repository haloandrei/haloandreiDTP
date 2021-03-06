import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Card = props =>{
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};

const styles = StyleSheet.create({
card:{
    shadowColor:"black",
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.26,
    shadowRadius:6,
    elevation:5,
    justifyContent:"center",
    alignItems:"center",
    maxWidth:"100%",
    borderRadius: 6,
    backgroundColor:"white",
    padding:20}
    }
);

export default Card;