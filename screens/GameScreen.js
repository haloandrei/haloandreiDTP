import React, {useEffect, useRef, useState} from "react";
import {Alert, Button, StyleSheet, Text, View} from "react-native";

import NumberContainer from "../components/Main/NumberContainer";
import Card from "../components/Card";
const generateRandomNumberBetween = (min,max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    let rn = Math.floor(Math.random()* (max-min)) + min ;
    if (rn === exclude)
        return generateRandomNumberBetween(min,max,exclude);
    else return rn;
};


const GameScreen = props =>{
    const [currentGuess,setCurrentGuess] = useState(generateRandomNumberBetween(1,100,props.userChoice));
    const min = useRef(1);
    const max = useRef(100);
    const numberOfRounds = useRef(0);

    useEffect(() => {if (currentGuess === props.userChoice){
        Alert.alert("Congratulations!", "The computer guessed your number:" + currentGuess.toString(), [{title:"New game",style:"destructive",onPress:props.gameOver.bind(this,numberOfRounds.current)}])
    }});

    const nextGuess = direction => {
        if (direction && currentGuess > props.userChoice || !direction && currentGuess < props.userChoice ){
            Alert.alert("Don\'t lie", "The computer needs to guess your number:" + props.userChoice.toString(), [{title:"Fine",style:"destructive"}]);
            return;
        }
        let newGuess;
        if (direction){
            min.current = currentGuess;
            newGuess = generateRandomNumberBetween(currentGuess,max.current);
        }
        else{
            max.current = currentGuess;
            newGuess = generateRandomNumberBetween(min.current, currentGuess);
        }
        numberOfRounds.current = numberOfRounds.current+1;
        setCurrentGuess(newGuess);
    };

    return <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
            <Button title={"Lower"} onPress={nextGuess.bind(this,false)}/>
            <Button title={"Greater"} onPress={()=>{nextGuess(true)}}/>
        </Card>
    </View>;
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:"center"
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:20,
        width:300,
        maxWidth:"80%"
    }
    }
);

export default GameScreen;