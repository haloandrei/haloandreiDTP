import React,{useEffect,useState} from 'react';
import {Button, LogBox, Permission, PushNotification, StyleSheet} from "react-native";

const Main = () =>{

    return (
        <div style={styles.Circle}></div>
    )
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    BoxContainer: {
        width: 200,
        height: 300,
        backgroundColor: '#000',
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 45,
        paddingHorizontal: 24,
    },
    Circle: {
        flex: 1,
        width: 100,
        height: 100,
        backgroundColor: '#b3ceb7',
    },
});

export default Main;