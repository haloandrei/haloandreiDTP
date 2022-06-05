import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import FadeOutView from "./FadeOutView";
import BackgroundSVG from "./BackgroundSVG";

const Item = ({ item, onPress, onLongPress, backgroundColor, textColor}) => {
    return !item.done ?
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress} style={[styles.roundButton1, backgroundColor]}>

                <BackgroundSVG uri={item.logoUri} xml={item.logoXML}/>
                <Text style={[styles.buttonTextPosition, styles.amount, textColor]} adjustsFontSizeToFit numberOfLines={1}>{item.amount}</Text>
                <View style={styles.buttonUnitsTextPosition}>
                    <Text style={[styles.unitsOfTask, textColor]} adjustsFontSizeToFit numberOfLines={1}>{item.task}</Text>
                </View>

        </TouchableOpacity> :
        <View>
            <TouchableOpacity onPress={onPress}>
                <FadeOutView style={styles.roundButton2}>

            <BackgroundSVG uri={item.logoUri} xml={item.logoXML}/>
            <Text style={[styles.buttonTextPosition, styles.amount, textColor]} adjustsFontSizeToFit numberOfLines={1}>{item.amount}</Text>
            <View style={styles.buttonUnitsTextPosition}>
                <Text style={[styles.unitsOfTask, textColor]} adjustsFontSizeToFit numberOfLines={1}>{item.task}</Text>
            </View>
        </FadeOutView>
        </TouchableOpacity>
        </View>;
};

const styles = StyleSheet.create({
        roundButton1: {
            shadowColor:"black",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
            width: 100,
            height: 100,
            margin:15,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 100,
            //borderWidth:5,
            // borderColor: "#9d03d3",
            overflow: "hidden"
        },
    roundButton2: {
        shadowColor:"black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 6.27,

        elevation: 10,
        width: 100,
        height: 100,
        margin:15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        // borderWidth:5,
        backgroundColor: "#77e864",
        // borderColor: "#249100",
        overflow: "hidden"
    },
    unitsOfTask: {
        fontSize: 32,
        fontWeight: "bold",
    },
    buttonTextContainer:{
        width:"70%",
        height: "70%",
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonTextPosition: {
            position: "absolute"
    },
    buttonUnitsTextPosition: {
            top:35,
        height:50,
        position: "absolute",
    },
    amount: {
            top:0,
        fontSize: 32,
        fontWeight: "bold",
    }

    }
);

export default Item;