import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export const useOrientation = () => {
    const [orientation, setOrientation] = useState<ScreenOrientation.Orientation>();

    useEffect(() => {
        async function getOrientation() {
            const curOrientation = await ScreenOrientation.getOrientationAsync();
            setOrientation(curOrientation);
        }

        getOrientation();

        const subscription = ScreenOrientation.addOrientationChangeListener(event => {
            setOrientation(event.orientationInfo.orientation);
        });

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        };
    }, []);

    return orientation;
};
