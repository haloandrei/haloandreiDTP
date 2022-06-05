import React from "react";
import Item from "./Item";


const renderItem = ({ item, setSelectedHandler }) => {
    const backgroundColor = item.done ? "#6e3b6e" : "#f4e1f6";
    const color = item.done ? 'green' : 'black';
    return (
        <Item
            item={item}
            onPress={() => setSelectedHandler(item.id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
        />
    );
};

export default renderItem;