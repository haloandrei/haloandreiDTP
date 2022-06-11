
import React, {useEffect, useRef, useState} from 'react';
import type {Node} from 'react';
import {Bar} from "react-native-progress";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput, Button, Alert, BackHandler,
} from 'react-native';

import TaskListScreen from "./screens/TaskListScreen";
import FlexWrapLayout from "./components/FlexWrap";
import AddTaskScreen from "./screens/AddTaskScreen";
import DataBase from "./components/DataBase";
import Card from "./components/Card";
import DayProgressDisplay from "./components/Main/DayProgressDisplay";
import color from "./constants/color";
import SideMenu from "./components/Main/SideMenu";
import Colors from "./constants/color";
import ScheduleTasksScreen from "./screens/ScheduleTasksScreen";
const CIRCLE = Math.PI * 2;

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const App: () => Node = () => {
  const [screenState,setScreenState] = useState("taskList");
  const [scheduler, setScheduler] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showMenuS, setShowMenuS] = useState(<></>);
  const [date,setDate] = useState(null);
  const [progress,setProgress] = useState(0.01);
  const [tasks,setTasks] = useState([]);
  const DB = useRef(new DataBase());
  var progressTotal = useRef(0);
  var progressDone = useRef(0);

  const computeProgress = () => {
    progressTotal.current = 0;
    progressDone.current = 0;
    tasks.forEach(e => {let etime=parseInt(e.etime); if (e.done) progressDone.current += etime; progressTotal.current += etime;})
    let res = progressDone.current/progressTotal.current;
    if(!isNaN(res))
      setProgress(res);
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));

  }, []);

  const addTaskHandler = () => {
    setScreenState("addTaskScreen");
  };
  const doneHandler = () => {
    setScreenState("taskList");
  }

  const scheduleTasksScreenHandler = () => {
    setScheduler(true);
  }

  const showMenu = () => {
    setShowMenuS(<View style={styles.sideMenu}>
      <Button style={styles.button} title={"Schedule Tasks"} onPress={scheduleTasksScreenHandler} color={Colors.neutral}/>
      <Button style={styles.button} title={"Erase Tasks"} onPress={() => {setTasks([]); DB.current.setTasks.bind(this,[]);}} color={Colors.fail}/>
    </View> );
  }

  const closeMenu = () => {
    setShowMenuS(<></> );
  }

  useEffect(()=>{
    computeProgress();
  },[tasks]);

  useEffect(()=>{
    DB.current.getDate(setDate);
    //setDate( "null");
    //DB.current.delCurrentTasks()
  },[]);

  useEffect(()=>{
    var today = new Date();
    var dateNow = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    if (dateNow!==date && date!==null){
      DB.current.storeDate(dateNow);
      DB.current.archiveTasks();
      DB.current.delCurrentTasks().then(r => DB.current.getTasks(setTasks));
    }
    if (dateNow===date){
      DB.current.getTasks(setTasks);
    }
  },[date]);

  let content = <TaskListScreen tasks={tasks} setTasks={setTasks} DB={DB.current} refreshed={refreshing} addButton={true} setProgress={setProgress} onRefresh={onRefresh} addTaskHandler={addTaskHandler}/>;

  let display = <></>;
  let sideMenuTag = <></>;
  if (screenState === "taskList") content = <TaskListScreen tasks={tasks} setTasks={setTasks} DB={DB.current} refreshed={refreshing} addButton={true} setProgress={setProgress} onRefresh={onRefresh} addTaskHandler={addTaskHandler}/>;
  if (screenState === "addTaskScreen") content = <AddTaskScreen tasks={tasks} setTasks={setTasks} DB={DB.current} doneHandler={doneHandler}/>;


  let mainMenuScreen = <><View style={styles.screen}>

    {/*<ScrollView*/}
    {/*    contentContainerStyle={styles.scrollView}*/}
    {/*    refreshControl={*/}
    {/*        <RefreshControl*/}
    {/*            refreshing={refreshing}*/}
    {/*            onRefresh={onRefresh}*/}
    {/*        />*/}
    {/*    }*/}
    {/*>*/}
    <Card style={styles.infographicContainer}>
      <View style={styles.progress}>
        <Bar progress={progress} width={300} height={20} borderWidth={4} borderRadius={20} borderColor={color.black} color={"#189d18"}/>
      </View>
      <View style={styles.dailyCircle}>
        <DayProgressDisplay size={100} radius={48} angle={progress * CIRCLE} color={color.neutral} tasks={tasks} borderWidth={2} borderColor={color.black}/>
      </View>


    </Card>

    {content}

  </View>
    {showMenuS}
    <SideMenu showMenu={showMenu} closeMenu={closeMenu} >
    </SideMenu>
  </>;
  if (scheduler === false) display = mainMenuScreen;
  else display = <ScheduleTasksScreen closeScheduler={setScheduler} tasks={tasks} setTasks={setTasks} DB={DB.current}/>

  return ( <SafeAreaView style={styles.container}>

        {display}

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infographicContainer:{
    flex:1,
    width:"100%",
    overflow:"hidden"
  },
  sideMenu:{
    position:"absolute",
    height:"100%",
    width:"25%",
    backgroundColor: "white",
    elevation:6,
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  progress:{
    alignContent:"center",
    justifyContent:"center",
    shadowColor:"black",
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.26,
    shadowRadius:6,
    elevation:5,

  },
  dailyCircle:{
    position:"relative",
    top:10,
    width:"80%",
    height:"80%",
  },
  buttonLabel: {
    fontSize: 40,
    fontWeight: "500",
    color: "coral",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth:20,
    borderColor:"#000",
    backgroundColor: "oldlace",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  buttonSideMenu: {
    marginTop:50,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth:20,
    borderColor:"#000",
    backgroundColor: "oldlace",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  screen:{
    flex:1
  },container: {
    flex: 1,
    backgroundColor:"aliceblue"
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"aliceblue"
  },
});

export default App;
