import React from "react";
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const SpecificTask = props =>{
    return  <TouchableOpacity
        onPress={props.buttonClickedHandler}
        style={styles.roundButton1}>
        <Text>30</Text>
        <Text>Pushups</Text>
    </TouchableOpacity>

};

const styles = StyleSheet.create({
    roundButton1: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
    },
    }
);

export default SpecificTask;