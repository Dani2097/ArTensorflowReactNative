import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';
import type { PropsWithChildren } from 'react';

type FadeInViewProps = PropsWithChildren<{ style?: ViewStyle, visible: boolean }>;

const FadeInView: React.FC<FadeInViewProps> = ({ style, visible, children }) => {
    const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current; // Initial value for opacity

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: visible ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <Animated.View // Special animatable View
            style={{
                ...style,
                opacity: fadeAnim, // Bind opacity to animated value
            }}
        >
            {children}
        </Animated.View>
    );
};

export default FadeInView;
