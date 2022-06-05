import React, { useRef, useEffect } from 'react';
import {SvgUri, SvgXml} from 'react-native-svg';
import {Image, StyleSheet, View} from "react-native";


const BackgroundSVG = props => {
    const source = <SvgXml width="80" height="80" xml={props.xml}/>
        // <Image source={props.uri}/>
    return props.uri === "" || props.uri === null ?
        <View style={styles.container2}></View> :
        <View style={styles.container}>
            {source}
        {props.children}
    </View> ;
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        opacity: 0.4,
    },
    container2: {
        position: "absolute",
        opacity: 0.5,
    }
});

export default BackgroundSVG;