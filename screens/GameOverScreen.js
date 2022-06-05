import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";

const GameOverScreen = props =>{
    console.log(props.numberOfGuesses);
    return <View style={styles.screen}>
        <Text>Game Over!</Text>
        <Text>Computer guessed your number in: {props.numberOfGuesses}</Text>
        <Button title={"New Game"} onPress={props.newGame}/>
    </View>
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }

}
);

export default GameOverScreen;