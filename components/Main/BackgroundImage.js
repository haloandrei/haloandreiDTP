import React, { useRef, useEffect } from 'react';
import {SvgUri, SvgXml} from 'react-native-svg';
import {Image, StyleSheet, Text, View} from "react-native";


const BackgroundImage = props => {
    let source = <></>;
    let imageType = props.item.logoType;
    console.log(imageType);
    console.log(props.item.logoUri);
    if (imageType==="svg"){
        source = <SvgXml width="80" height="80" xml={props.item.logoXML}/>;
    }
    else if (imageType === "img"){
        console.log("DAA");
        source = <Image style={{width:100,height:100}} source={{uri:props.item.logoUri}}/>;
    }
    let testSource = <Image  style={{width:100,height:100}} source={{uri:"https://www.hellomagazine.com/imagenes/bloques/ola/ola-new-desktop.webp?filter=high"}}/>
    console.log(source);
        // <Image source={props.uri}/>
    // return <View style={styles.container}><Text>{props.item.logoUri}</Text></View>;
    return props.item === "" || props.item === null ?
        <View style={styles.container2}></View> :
        <View style={styles.container}>
            {source}
            {props.children}
        </View>;
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

export default BackgroundImage;