import React, {useRef, useEffect} from 'react';
import {Animated, Text, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{style?: ViewStyle,TOAST_TIME?:number}>;

const SlideInViewAndOut: React.FC<FadeInViewProps> = props => {
    const fadeAnim = useRef(new Animated.Value(-100)).current; // Initial value for opacity: 0

    useEffect(() => {
        Animated.spring(fadeAnim, {
            toValue: 0,
            speed: 2,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);
    useEffect(() => {
        setTimeout(() => {
            Animated.spring(fadeAnim, {
                toValue: -100,
                speed: 2,
                useNativeDriver: true,
            }).start();
        }, props.TOAST_TIME||4000);
    }, [fadeAnim]);
    return (
        <Animated.View // Special animatable View
            style={{
                ...props.style,
                transform: [{translateY: fadeAnim}],
                // opacity: fadeAnim, // Bind opacity to animated value
            }}>
            {props.children}
        </Animated.View>
    );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default SlideInViewAndOut;
