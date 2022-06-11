import React, {useEffect, useState} from "react";
import {AsyncStorage, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import Card from "../components/Card";
import Input from "../components/Main/Input";
import Colors from "../constants/color";
import * as RNFS from 'react-native-fs';
import * as DocumentPicker from "react-native-document-picker";
import color from "../constants/color";

const AddTaskScreen = props =>{
    const [enteredValue, setEnteredValue] = useState("min");
    const [quantity,setQuantity] = useState("10");
    const [timeEstimate,setTmeEstimate] = useState("10");
    const [logoUri,setLogoUri] = useState("");
    const [logoXML,setLogoXML] = useState("");
    const [timeAlert,setTimeAlert] = useState(<></>);
    const [usesMin,setUsesMin] = useState(true);
    const [etaTag,setEtaTag] = useState(<View><Text style={styles.text}>Specify Time Estimate (min)</Text>
        <View style={styles.textInputContainer}>
            <Input blurOnSubmit autoCapitalize="none" autoCorrect={false} style={styles.input} onChangeText={timeHandlerText} value={timeEstimate}/>
        </View></View>);
    const inputHandlerText = inputText =>{
            inputText = inputText.toString();
        console.log(inputText);
            if (inputText === "min")
                setUsesMin(true);
            else setUsesMin(false);
        setEnteredValue(inputText);
    };

    const quantityHandlerText = inputText =>{

        inputText = inputText.toString();
        setQuantity(inputText.replace(/[^0-9]/g, ''));
    };
    const timeHandlerText = inputText =>{

        inputText = inputText.toString();
        inputText = inputText.replace(/[^0-9]/g, '');
        if (parseInt(inputText) > timeLeft)
        {
            setTimeAlert(<Text style={styles.textWarning}>The task exceeds the working time you have left in the day!</Text>)
        }

        setTmeEstimate(inputText);

    };

    let sleepStart = 600;
    let time = new Date();
    let minutes = time.getMinutes() + time.getHours()*60;
    let timeLeft = sleepStart + 720 - minutes;
    props.tasks.forEach((task)=>{
        if (!task.done) timeLeft -= task.etime;
        });
    function getId() {
        return new Date().toLocaleString();
    }

    const confirmInputHandler = () =>{
        let newTask = {amount: quantity, task: enteredValue, etime: timeEstimate, done: false, logoUri: logoUri, logoXML: logoXML, id: getId()};
        props.setTasks([...props.tasks,newTask])
        props.DB.storeTask(newTask,props.doneHandler);
    }

    const openDocumentFile =async () => {
        try {

            const result = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.allFiles]
            })
            setLogoUri(result.uri);
            RNFS.readFile(result.uri, 'ascii').then(res => {
                let xml = res.replace(/<path /g,"<path style=\"fill:#000000;\" ");
                xml = xml.replace(/circle/g,"circle style=\"fill:#000000;\" ");
                if (xml.includes("stroke")) xml = xml.replace(/style="fill:#000000;" /g,"");

                setLogoXML(xml);
            })
                .catch(err => {
                    console.log(err.message, err.code);
                });
        } catch (e) {
            if (DocumentPicker.isCancel(e)){
                //exist dialog if needed
                console.log(e)
            }
            else {
                throw e;
            }
        }
    }



    useEffect(()=>{
        if (usesMin === false) setEtaTag(<View style={styles.textInputContainer}><Text style={styles.text}>Specify Time Estimate (min)</Text>
            <View style={styles.textInputContainer}>
                <Input blurOnSubmit autoCapitalize="none" autoCorrect={false} style={styles.input} onChangeText={timeHandlerText} value={timeEstimate}/>
            </View></View>);
        else setEtaTag(<></>);
    },[usesMin]);


    return  <Card>
                <Text style={styles.text}>Units of Measure</Text>
                <View style={styles.textInputContainer}>
                    <Input blurOnSubmit autoCapitalize="none" autoCorrect={false} style={styles.input} placeholder={"min"} onChangeText={inputHandlerText} value={enteredValue}/>
                </View>
                <Text style={styles.text}>Specify Quantity</Text>
                <View style={styles.textInputContainer}>
                    <Input blurOnSubmit autoCapitalize="none" autoCorrect={false} style={styles.input} onChangeText={quantityHandlerText} value={quantity}/>
                </View>
                <Text style={styles.text}>Free Time remaining: {timeLeft.toString()}</Text>
                {timeAlert}
                {etaTag}
                <View style={styles.buttonInputs}>
                    <View style={styles.button} >
                        <Button style={styles.button} title={"Select Logo"} onPress={openDocumentFile} color={Colors.neutral}/>
                    </View>
                </View>
                <View style={styles.buttonInputs}>
                    <View style={styles.button} >
                        <Button style={styles.button} title={"Confirm"} onPress={confirmInputHandler} color={Colors.progress}/>
                    </View>
                </View>

            </Card>
};

const styles = StyleSheet.create({
        screen:{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        },
    textWarning: {
      color:color.fail,
    },
    textInputContainer:{
        minWidth:300,
        justifyContent:"center",
        alignItems:"center",
        width:'80%',
        color:color.black,
    },
    input:{
        width:'80%',
        textAlign:"center",
        color:color.black
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
        width:"80%",
        margin:5

    },
    button:{
        minWidth:70
    },
    text:{
      color:color.black,
    }

    }
);

export default AddTaskScreen;