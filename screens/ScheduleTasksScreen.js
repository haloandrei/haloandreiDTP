import React from "react";
import {StyleSheet, Text, View} from "react-native";
import TaskListScreen from "./TaskListScreen";
import color from "../constants/color"
import BackButton from "../components/Main/BackButton";

const ScheduleTasksScreen = (props) => {

    return <View style={styles.screen}>
        <BackButton closeScheduler={props.closeScheduler}/>
        <Text> Repeat tasks </Text>
        <TaskListScreen addButton={false} schedule={true} tasks={props.tasks} setTasks={props.setTasks} DB={props.DB}/>
    </View>
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:color.ongoingTask
    },
})

export default ScheduleTasksScreen;