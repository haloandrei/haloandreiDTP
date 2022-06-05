import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DataBase = () => {

}

    DataBase.prototype.getTasks = async (setTasks) => {
        try {
            await AsyncStorage.getItem('tasks', (err, result) => {
                if (result !== null) {
                    setTasks(JSON.parse(result));
                } else {
                    console.log('Error: Data Not Found');
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    DataBase.prototype.getDate = async (setDate) => {
        try {
            await AsyncStorage.getItem('date', (err, result) => {
                if (result !== null) {
                    setDate(JSON.parse(result));
                } else {
                    setDate("");
                    console.log('Error: Data Not Found');
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    DataBase.prototype.storeDate = async (date) => {
        try {
            await AsyncStorage.setItem('date', JSON.stringify(date));
        } catch (error) {
            console.log('error');
        }
    }

    DataBase.prototype.archiveTasks = async () => {
        try {
            var oldTasks= null;
            await AsyncStorage.getItem('tasks', (err, result) => {
                oldTasks = JSON.parse(result)});
            if (oldTasks !== null && oldTasks.length!==0){
                console.log(oldTasks.length)
            await AsyncStorage.getItem('archiveTasks', (err, result) => {
                if (result !== null) {
                    var newTasks = JSON.parse(result).concat(oldTasks);
                    AsyncStorage.setItem('archiveTasks', JSON.stringify(newTasks));
                } else {
                    console.log('Data Not Found');
                    AsyncStorage.setItem('archiveTasks', JSON.stringify(oldTasks));
                }
            });
        }} catch (error) {
            console.log('error');
        }
    }

    DataBase.prototype.storeTask = async (task,doneHandler) => {
        try {
            await AsyncStorage.getItem('tasks', (err, result) => {
                const addedTask = [task];
                if (result !== null) {
                    //console.log('Data Found', result);
                    var newTasks = JSON.parse(result).concat(addedTask);
                    AsyncStorage.setItem('tasks', JSON.stringify(newTasks)).then(doneHandler());
                } else {
                    console.log('Data Not Found');
                    AsyncStorage.setItem('tasks', JSON.stringify(addedTask)).then(doneHandler());
                }
            });
        } catch (error) {
            console.log('error');
        }
    }

    DataBase.prototype.delTask = async (itemId,setTasks) => {
        if(itemId!== null)
        {
            // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            // await delay(7000);
            try {
                await AsyncStorage.getItem('tasks', (err, result) => {
                    if (result !== null) {
                        let oldTasks = JSON.parse(result);
                        if (oldTasks.findIndex(x => x.id === itemId) !== -1)
                        {
                            oldTasks.splice(oldTasks.findIndex(x => x.id === itemId),1);
                            console.log("~~~~~~~~~~~~~~~~~\n\n~~~~~~~~~~~~~~");
                            oldTasks.forEach(e=> console.log(e.id));
                            AsyncStorage.setItem('tasks',JSON.stringify(oldTasks)).then(setTasks(oldTasks));
                        }
                    } else {
                        console.log('Error: Data Not Found');
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

DataBase.prototype.delCurrentTasks = async () => {
        try {
            var oldTasks= null;
            await AsyncStorage.getItem('tasks', (err, result) => {
                oldTasks = JSON.parse(result)});
            if (oldTasks !== null && oldTasks.length!==0) {
                let nextDayTasks = [];
                oldTasks.forEach((task) => {
                    if (task.repeatEvery !== undefined) {
                        task.done = false;
                        nextDayTasks.push(task);
                    }
                })
                await AsyncStorage.setItem('tasks', JSON.stringify(nextDayTasks));
            }
        } catch (error) {
            console.log(error);
        }
}

DataBase.prototype.setTasks = async (newTasks) => {
    try {
        console.log("ssaaa")
        console.log(newTasks)
        await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
        console.log(error);
    }
}


export default DataBase;