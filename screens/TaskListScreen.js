import React, {useEffect, useRef, useState} from "react";
import {
    AsyncStorage,
    FlatList,
    RecyclerViewBackedScrollView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import SpecificTask from "../components/Main/SpecificTask";
import renderItem from "../components/Main/RenderItem";
import Color from "../constants/color";

const TaskListScreen = props => {

    const updateTasksDone = (itemId) => {
        var newTasks = props.tasks.map((x)=>x);
        var pos = newTasks.findIndex(x => x.id === itemId);
        newTasks[pos].done = !newTasks[pos].done;
        props.setTasks(newTasks);
        props.DB.setTasks(newTasks);
    }

    const scheduleTaskDone = (itemId) => {
        var newTasks = props.tasks.map((x)=>x);
        var pos = newTasks.findIndex(x => x.id === itemId);
        newTasks[pos].repeatEvery = 1;
        props.setTasks(newTasks);
        props.DB.setTasks(newTasks);
    }

    const setSelectedHandler = (itemId) => {
        if (props.schedule !== true)
            updateTasksDone(itemId);
        else
            scheduleTaskDone(itemId);
        //props.DB.delTask(tasks[pos],setTasks)
    } ;



    const splitTask = (itemId) => {
        if (props.schedule !== true){
            var newTasks = props.tasks.map((x)=>x);
            var pos = newTasks.findIndex(x => x.id === itemId);
            newTasks[pos].amount = newTasks[pos].amount / 2;
            newTasks[pos].etime = newTasks[pos].etime / 2;
            let newTask = JSON.parse(JSON.stringify(newTasks[pos]));
            newTask.id = new Date().toLocaleString();
            newTasks.splice(pos,0,newTask);
            props.setTasks(newTasks);
            props.DB.setTasks(newTasks);

        }
        //props.DB.delTask(tasks[pos],setTasks)
    } ;

    let addButton = <></>
    if (props.addButton === true) {
        addButton =<TouchableOpacity style={styles.floatButton} onPress={props.addTaskHandler}>
        <Text style={{fontSize: 48, color: "white"}}>+</Text>
    </TouchableOpacity>;
    }

    return (<View style={styles.listContainer}>
            <FlatList
                data={props.tasks}
                numColumns={3}
                renderItem={({item}) => renderItem({item,setSelectedHandler, splitTask})}
                scrollEnabled={true}
            >
            </FlatList>
            {/*<SpecificTask buttonClickedHandler={console.log.bind("yes")}/>*/}
            {addButton}
    </View>

);
}

const styles = StyleSheet.create({
listContainer:{
        flex: 2,
        flexDirection:"row",
        backgroundColor: "aliceblue",
        maxHeight: 400,
},
floatButton:{
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: Color.primary,
    borderRadius: 100,
    shadowColor:"black",
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.26,
    shadowRadius:6,
    elevation:5,
}
});

export default TaskListScreen;