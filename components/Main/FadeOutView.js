import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const FadeOutView = (props) => {
    const fadeAnim = useRef(new Animated.Value(1)).current  // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 0.5,
                duration: 5000,
                useNativeDriver: false
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}

export default FadeOutView;