import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import Svg, {Line, Rect} from "react-native-svg";
import Sector from "./Sector";
import Circle from "./Circle";
import color from "../../constants/color";

const CIRCLE = Math.PI * 2;
const DayProgressDisplay = (props) => {

   const [taskSegmentsDone, setTaskSegmentsDone] = useState(<></>);
    const [taskSegmentsOverdue, setTaskSegmentsOverdue] = useState(<></>);
    const [taskSegmentsOngoing, setTaskSegmentsOngoing] = useState(<></>);
   const [handleBar,setHandleBar] = useState(<></>);
    let tasks = useRef(props.tasks);
    tasks.current = props.tasks;

   const borderWidthTasks = 2;
   const sleepStart = 600;  ///unify it with other declarations throughout the program in App
   const sleepDuration = 600;
   const scaleTransformOffset = 2.5;
   const anglePiRotationPerMinute = 0.00069;
   const angleDegRotationPerMinute = 0.25;
   const startRotation = (sleepStart+sleepDuration)*anglePiRotationPerMinute;
   const nightRotation = sleepStart*anglePiRotationPerMinute;
   const handleBarSpace = 20;
   var currRotation;
    //let rotateAnim = useRef(0);

    const findSplitInTasks = (tasksNotDone, timeRemaining) => {
        let res = -1;
        for (let i = 0; i < tasksNotDone.length; i++) {
            timeRemaining-= tasksNotDone[i].etime;
            if (timeRemaining<=0) {res=i; break;}
        }
        return res;
    }

    const mapAllTasks = (tasksPassed) => {

       var tasksDone=[];
       var tasksOverdue=[];
       var tasksOngoing=[];
       var tasksNotDone=[];
       tasksPassed.forEach((task)=>{

           if (task.done) tasksDone = [...tasksDone,task];
           else tasksNotDone = [...tasksNotDone, task];
       });
       let time = new Date();
       let minutes = time.getMinutes() + time.getHours()*60;
       let timeLeft = sleepStart + 720 - minutes;
       tasksNotDone.sort((a,b) => { return b.etime - a.etime;});
       let indexTasksSplit = findSplitInTasks(tasksNotDone,timeLeft);
       if (indexTasksSplit!==-1)
       {
           tasksOngoing = tasksNotDone.splice(0,indexTasksSplit);
           tasksOverdue = tasksNotDone;
       }
       else{
           tasksOngoing = tasksNotDone;
       }
       // console.log(indexTasksSplit);
       // console.log(tasksOngoing);
       // console.log(tasksOverdue);
      mapDoneTasksToCircle(tasksDone);
      mapOngoingTasksToCircle(tasksOngoing,tasksOverdue, minutes);
   };

   const mapDoneTasksToCircle = (tasks) => {
       currRotation = startRotation;
       let nextRotation = startRotation;
       if (tasks.length!==0)
       setTaskSegmentsDone(tasks.map((task) => {
           currRotation = nextRotation;
           nextRotation += task.etime * anglePiRotationPerMinute;
           return <Svg key={task.id} style={[StyleSheet.absoluteFill,{transform: [ {translateY: (handleBarSpace+ props.borderWidth*scaleTransformOffset)},{translateX: props.borderWidth*scaleTransformOffset}]}]} height="100%" width="100%" viewBox={"0 0 100 100"} >
               <Sector  radius={props.radius} startAngle={ (currRotation -borderWidthTasks * anglePiRotationPerMinute )*CIRCLE} angle={task.etime * anglePiRotationPerMinute * CIRCLE} fill={color.black} />
               <Sector  radius={props.radius} startAngle={ currRotation*CIRCLE} angle={task.etime * anglePiRotationPerMinute * CIRCLE} fill={color.doneTask} />
           </Svg>;}));
       else setTaskSegmentsDone(<></>);
   }
   const mapOngoingTasksToCircle = (tasksOngoing,tasksOverdue, minutes) => {
       let offsetRot = 0;
       if (tasksOverdue.length!==0)
       {
           tasksOngoing.forEach((task)=>{offsetRot = offsetRot + parseInt(task.etime);});
           // console.log(nightRotation);
           // console.log(minutes * anglePiRotationPerMinute);
           // console.log(offsetRot );
           offsetRot = nightRotation - (minutes * anglePiRotationPerMinute + offsetRot*anglePiRotationPerMinute);
       }
       else offsetRot=0.5;
       currRotation = minutes * anglePiRotationPerMinute + offsetRot;
       let nextRotation = currRotation;
       if (tasksOngoing.length!==0)
           setTaskSegmentsOngoing(tasksOngoing.map((task) => {
               currRotation = nextRotation;
               nextRotation += task.etime * anglePiRotationPerMinute;
               return <Svg key={task.id} style={[StyleSheet.absoluteFill,{transform: [ {translateY: (handleBarSpace+ props.borderWidth*scaleTransformOffset)},{translateX: props.borderWidth*scaleTransformOffset}]}]} height="100%" width="100%" viewBox={"0 0 100 100"} >
                   <Sector  radius={props.radius} startAngle={ (currRotation -borderWidthTasks * anglePiRotationPerMinute )*CIRCLE} angle={task.etime * anglePiRotationPerMinute * CIRCLE} fill={color.black} />
                   <Sector  radius={props.radius} startAngle={ currRotation*CIRCLE} angle={task.etime * anglePiRotationPerMinute * CIRCLE} fill={color.ongoingTask} />
               </Svg>;}));
       else setTaskSegmentsOngoing(<></>);
       nextRotation = minutes * anglePiRotationPerMinute + offsetRot;
       if (tasksOverdue.length!==0)
           setTaskSegmentsOverdue(tasksOverdue.map((task) => {
               currRotation = nextRotation;
               nextRotation -= task.etime * anglePiRotationPerMinute;
               return <Svg key={task.id} style={[StyleSheet.absoluteFill,{transform: [ {translateY: (handleBarSpace+ props.borderWidth*scaleTransformOffset)},{translateX: props.borderWidth*scaleTransformOffset}]}]} height="100%" width="100%" viewBox={"0 0 100 100"} >
                   <Sector  radius={props.radius} startAngle={ (currRotation -task.etime * anglePiRotationPerMinute )*CIRCLE} angle={task.etime * anglePiRotationPerMinute * CIRCLE} fill={color.black} />
                   <Sector  radius={props.radius} startAngle={ (currRotation -task.etime * anglePiRotationPerMinute )*CIRCLE} angle={(task.etime * anglePiRotationPerMinute - borderWidthTasks * anglePiRotationPerMinute) * CIRCLE} fill={color.overdueTask} />
               </Svg>;}));
       else setTaskSegmentsOverdue(<></>);
   }

   const clockHandPosition = () => {
      // (minutes*angleDegRotationPerMinute +180).toString() +'deg'
      var time = new Date();
      var minutes = time.getMinutes() + time.getHours()*60;
      setHandleBar([<Svg key={"BarHand"} style={[StyleSheet.absoluteFill,{transform: [
              {translateY: (handleBarSpace)},{translateX: 0},
                  {rotate:(minutes*angleDegRotationPerMinute +180).toString() +'deg'},
              {translateY: -(handleBarSpace)},{translateX: 0},
              ]} ]} height="100%" width="100%" viewBox={"0 0 100 100" } >
              {/*<Rect fill={color.transparent} height={"100"} width={"100"} y={"0"}/>*/}
              {/*<Rect fill={color.black} height={"100"} width={"1"} x={"49.5"} />*/}
              {/*<Rect fill={color.black} width={"100"} height={"1"} y={"49.5"} />*/}
              <Line x1={(props.radius+props.borderWidth).toString()} y1="2" x2={(props.radius+props.borderWidth).toString()} y2={(props.radius+handleBarSpace/scaleTransformOffset).toString()} stroke={color.orangeLight} strokeWidth="2"/>
             <Circle key={"middleCHandL"} radius={3} fill={color.orangeLight} x={(props.radius+props.borderWidth)-3} y={0}/>
          <Line x1={(props.radius+props.borderWidth).toString()} y1="2" x2={(props.radius+props.borderWidth).toString()} y2={(props.radius+handleBarSpace/scaleTransformOffset).toString()} stroke={color.orange} strokeWidth="1"/>
              <Circle key={"middleCHandO"} radius={2} fill={color.orange} x={(props.radius+props.borderWidth)-2} y={1}/>
              {/*<Rect fill={color.black} height={(200).toString()} width={"1"} x={"49"} />*/}
          </Svg>,<Svg key={"CirclHand"} style={[StyleSheet.absoluteFill,{transform: [{translateY: (handleBarSpace+ props.borderWidth*scaleTransformOffset)},{translateX: props.borderWidth*scaleTransformOffset}]}]} height="100%" width="100%" viewBox={"0 0 100 100"} >
              <Circle key={"middleCHandL"} radius={3} fill={color.orangeLight} x={props.radius-3} y={props.radius-3}/>
              <Circle key={"middleCHandO"} radius={1} fill={color.orange} x={props.radius-1} y={props.radius-1}/>
          </Svg>
          ]
      )
   }

   useEffect(()=>{

      let clockInterval = setInterval(()=>{
         clockHandPosition();
         mapAllTasks(tasks.current);
      },2000); //update every second??

       return () => clearInterval(clockInterval);
   },[]);

   useEffect(()=>{
       mapAllTasks(props.tasks);
   },[props.tasks]);
   return <View style={ [StyleSheet.absoluteFill,{ alignItems: 'center', justifyContent: 'center'}]}>
      {/*<Svg style={[StyleSheet.absoluteFill,{transform: [{rotate: '0deg'}]}]} height="95%" width="95%" viewBox={(-props.borderWidth+20).toString() + " " + (-props.borderWidth+20).toString() +" 105 105"} >*/}
      {/*   <Rect fill={color.orange} height={"150"} width={"150"} y={-20} />*/}
      {/*</Svg>*/}
      <Svg style = {[StyleSheet.absoluteFill,{transform: [ {translateY: (handleBarSpace)},{translateX: 0},{rotate:'0deg'}]}]} height="100%" width="100%" viewBox={"0 0 100 100"} >
         <Circle
             radius={props.radius+props.borderWidth}
             fill={props.borderColor}
             offset={{top: 0, left: 0}}
         />
      </Svg>
       <Svg style = {[StyleSheet.absoluteFill,{transform: [ {translateY: (handleBarSpace+ props.borderWidth*scaleTransformOffset)},{translateX: props.borderWidth*scaleTransformOffset},{rotate:'0deg'}]}]} height="100%" width="100%" viewBox={"0 0 100 100"} >
           <Circle
               radius={props.radius}
               fill={color.greyDay}
               offset={{top: 0, left: 0}}
           />
       </Svg>

      {/*<Svg style={[StyleSheet.absoluteFill,{transform: [{rotate: '0.90101deg'}]}]} height="95%" width="95%" viewBox={(-props.borderWidth).toString() + " " + (-props.borderWidth).toString() +" 105 105"} >*/}
      {/*   <Rect fill={color.black} height={props.radius.toString()} width={"3"} x={"49"} />*/}
      {/*   <Sector  radius={props.radius} angle={props.angle} offset={{top: 0, left: 0.5}} fill={color.progress} />*/}
      {/*</Svg>*/}
      {/* <Svg style={[StyleSheet.absoluteFill,{transform: [{rotate: '0deg'}]}]} height="100%" width="100%" viewBox={(-props.borderWidth).toString() + " " + (-props.borderWidth-10).toString() +" 100 100"} >*/}
      {/*     <Rect fill={color.black} height={(props.radius*2).toString()} width={"1"} x={props.radius.toString()} />*/}
      {/*     <Rect fill={color.black} width={(props.radius*2).toString()} height={"1"} y={props.radius.toString()} />*/}
      {/* </Svg>*/}

       {taskSegmentsDone}
       {taskSegmentsOverdue}
       {taskSegmentsOngoing}
       <Svg style={[StyleSheet.absoluteFill,{transform: [ {translateY: (handleBarSpace+ props.borderWidth*scaleTransformOffset)},{translateX: props.borderWidth*scaleTransformOffset}]}]} height="100%" width="100%" viewBox={"0 0 100 100"} >
           <Sector  radius={props.radius} startAngle={ sleepStart*anglePiRotationPerMinute*CIRCLE} angle={600 * anglePiRotationPerMinute * CIRCLE} fill={color.night} />
       </Svg>
       {handleBar}
   </View>
}

const styles = StyleSheet.create({
container:{
   backgroundColor:"#49499b"
}
});

export default DayProgressDisplay;