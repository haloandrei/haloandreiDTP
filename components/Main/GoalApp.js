import {Button, FlatList, useColorScheme, View} from "react-native";
import React, {useState} from "react";
import GoalInput from "./GoalInput";
import GoalItem from "./GoalItem";

const GoalApp = props =>{
    const isDarkMode = useColorScheme() === 'dark';
    const [page, setPage] = useState(true);
    const [courseGoals, setCurrentGoals] = useState([]);
    const [isAddMode,setIsAddMode] = useState(false);

    let addGoalHandler = goalTitle => {
        setCurrentGoals( currentGoals => [...currentGoals, {id: Math.random().toString(), value: goalTitle}]);
        setIsAddMode(false);
    }

    const removeGoalHandler = goalId => {
        setCurrentGoals( currentGoals => {
            return currentGoals.filter((goal)=> goal.id !== goalId);
        });
    }
    const visibilityHandler = () => {
        setIsAddMode(false);
    }
    return (
        <View style={styles.screen}>
            <Button title={"Add New Goal"} onPress={() => setIsAddMode(true)}/>
            <GoalInput onAddGoal={addGoalHandler} visible={isAddMode} visibleHandler={visibilityHandler}/>
            <FlatList
                keyExtractor={(item,index) => item.id}
                data={courseGoals}
                renderItem={itemData =>
                    <GoalItem
                        id = {itemData.item.id}
                        onDelete={removeGoalHandler}
                        title={itemData.item.value}
                    />
                }
            />

        </View>
    );
}

export default GoalApp;