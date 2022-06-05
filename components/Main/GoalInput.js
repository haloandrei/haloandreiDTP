import React, {useState} from "react";
import {Button, TextInput, View, StyleSheet, Modal} from "react-native";

const GoalInput = props => {
  const [enteredGoal,setEnteredGoal] = useState("");
  let goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  }

  let addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal("");
  }
  return  <Modal visible={props.visible} animationType="slide">
    <View style={styles.inputContainer}>
      <TextInput placeholder="Course Goals" style={styles.input} onChangeText={goalInputHandler} value={enteredGoal}/>
      <View style={styles.buttonControls}>
        <View style={styles.button}>
          <Button title={"Add"} onPress={addGoalHandler}/>
        </View>
        <View style={styles.button}>
          <Button title={"Cancel"} color="red" onPress={props.visibleHandler}/>
        </View>
      </View>
    </View>
  </Modal>
};

const styles = StyleSheet.create({
  inputContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  buttonControls:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:"60%"
  },
  button:{
    width:"40%"
  },
  input:{
    width:'80%',
    borderColor:'black',
    borderWidth:1,
    padding:10,
    margin:10
  }
})

export default GoalInput