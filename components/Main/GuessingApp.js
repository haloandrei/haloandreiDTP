/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';
import type {Node} from 'react';
import {Button, FlatList, LogBox, Permission, PushNotification, TextInputComponent} from "react-native";

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import GoalItem from "./components/Main/GoalItem";
import GoalInput from "./components/Main/GoalInput";

import Header from "./components/Main/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";



const App: () => Node = () => {
    const [userNumber,setUserNumber] = useState(null);
    const [gameRounds, setGameRounds] = useState(0);

    let startGameHandler = (selectedNumber) =>{
        setUserNumber(selectedNumber);
    };



    let content = <StartGameScreen onStartGame = {startGameHandler}/>;

    let resetGameHandler = () => {
        setUserNumber(null);
        setGameRounds(0);
    };

    let gameOverHandler = (roundsPlayed) => {
        setGameRounds(roundsPlayed);
        setUserNumber(null);
    };

    console.log(userNumber)
    if (userNumber !== null && gameRounds === 0) {
        content = <GameScreen userChoice={userNumber}  gameOver={gameOverHandler}/>;
    }
    else if (userNumber === null && gameRounds !== 0)
        content = <GameOverScreen numberOfGuesses={gameRounds} newGame={resetGameHandler}/>;
    else content = <StartGameScreen onStartGame = {startGameHandler}/>;




    return (
        <View style={styles.screen}>
            <Header title={"Guessing Game!"}/>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1
    }
});

export default App;
