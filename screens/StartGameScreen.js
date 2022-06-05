import React, {useState} from "react";
import {Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import Card from "../components/Card";

import Colors from "../constants/color";
import Input from "../components/Main/Input";
import NumberContainer from "../components/Main/NumberContainer";
const StartGameScreen = props =>{
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmedValue, setConfirmedValue] = useState(false);
    const [selectedNumber,setSelectedNumber] = useState(null);

    const inputHandlerText = inputText =>{
        if (inputText.toString().length > 2)
            inputText = inputText.toString().slice(0,2);
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () =>
    {
        setEnteredValue('');
        setConfirmedValue(false);
    };

    const confirmInputHandler = () =>
    {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >99){
            Alert.alert("Invalid number!", "Number has to be a number between 1 and 99", [{text:"okay",style: 'destructive',onPress:resetInputHandler}]);
            return;
        }
        Keyboard.dismiss();
        setConfirmedValue(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
    };

    const playHandler = () => {
        props.onStartGame(selectedNumber);
    };
    let confirmedOutput;

    if (confirmedValue) {
        confirmedOutput = (
            <Card style={styles.card}>
                <Text>Chosen number: </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title={"Play"} color={Colors.primary} onPress={playHandler}/>
            </Card>

        );
    }
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
        <View style={styles.screen}>
            <Text style={styles.specialTitle}>Start a new game!</Text>
            <Card>
                <Text>Select a number</Text>
                <View style={styles.textInputContainer}>
                    <Input blurOnSubmit autoCapitalize="none" autoCorrect={false} keyboardType="number-pad" maxLenght={2} style={styles.input} placeholder={"23"} onChangeText={inputHandlerText} value={enteredValue}/>
                </View>

                <View style={styles.buttonInputs}>

                    <View style={styles.button} >
                        <Button title={"Reset"} onPress={resetInputHandler} color={Colors.primary}/>
                    </View>
                    <View style={styles.button} >
                        <Button style={styles.button} title={"Confirm"} onPress={confirmInputHandler} color={Colors.accent}/>
                    </View>

                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
screen:{
    flex:1,
    padding:1,
    alignItems:"center"
    },
    textInputContainer:{
        width:'80%',
    },
    input:{
    width:50,
        textAlign:"center"
    },
    card:{
    marginVertical:10,
        width:"80%"
    },
    specialTitle:{
        color:"green",
        fontSize:20
    },
    inputContainer:{
        minWidth:300,
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
        padding:20

    },
    buttonInputs:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        width:"80%"


    },
    button:{
    minWidth:70
    }
});

export default StartGameScreen;