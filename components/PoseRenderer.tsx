import React, {useContext, useRef} from 'react';
import {Image, Platform} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {CameraType} from 'expo-camera/build/Camera.types';
import image from '../assets/ore1.png';
import neck from '../assets/neck2.png';
import {calculateCoordinates, calculateCenter} from './utils/generic';
import {MIN_KEYPOINT_SCORE} from "./utils/generic";
import {Camera} from "expo-camera";
import {ProductsContext} from "./ProductContenxt";

const IS_ANDROID = Platform.OS === 'android';

interface PoseRendererProps {
    poses: any[] | undefined;
    cameraType: CameraType;
    isPortrait: boolean;
}

const PoseRenderer: React.FC<PoseRendererProps> = ({poses, cameraType, isPortrait}) => {
    const flipX = IS_ANDROID || cameraType === Camera.Constants.Type.back;
    const neckPositionRef = useRef({left: 0, top: 0});
    const {selectedEarrings, selectedNecklace} = useContext(ProductsContext);
    if (!poses || poses.length === 0 || (!selectedEarrings && !selectedNecklace)) {
        return null;
    }
    const keypoints = poses[0].keypoints
        .filter(k => (k.score ?? 0) > MIN_KEYPOINT_SCORE && (k.name?.includes('ear')));

    const shoulders = poses[0].keypoints
        .filter(k => (k.score ?? 0) > MIN_KEYPOINT_SCORE && k.name?.includes('shoulder'));

    const renderShoulders = shoulders.map(k => {
        const {cx, cy} = calculateCoordinates(k, flipX, isPortrait);

        return {
            icon: <Circle key={`skeletonkp_${k.name}`} cx={cx} cy={cy} r='4' strokeWidth='2' fill='#00AA00'
                          stroke='white'/>,
            coordinates: {x: cx, y: cy},
        };
    });

    const distance = Math.abs(keypoints[0]?.x - keypoints[1]?.x) || 1;
    let centerIcon = null;
    if (renderShoulders.length === 2 && selectedNecklace) {
        const {centerX, centerY} = calculateCenter(renderShoulders[0].coordinates, renderShoulders[1].coordinates);

        const coefficient = distance * 2;
        let left = centerX - 1 * coefficient;
        let top = centerY - 0.5 * coefficient;
        const distance2 = Math.sqrt(
            Math.pow(left - neckPositionRef.current?.left, 2) +
            Math.pow(top - neckPositionRef.current?.top, 2)
        );

        if (distance2 > 15 || !neckPositionRef.current?.left) {
            neckPositionRef.current = {left, top};
        }

        // Calcola l'angolo di rotazione
        const dx = renderShoulders[1].coordinates.x - renderShoulders[0].coordinates.x;
        const dy = renderShoulders[1].coordinates.y - renderShoulders[0].coordinates.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Converti l'angolo in gradi
        centerIcon =
            <>
                {/*<Circle key={`center`} cx={centerX} cy={centerY} r='8' strokeWidth='2' fill='#FF0000' stroke='white'/>*/}
                <Image source={{uri: selectedNecklace.image.replace(/ /g, '')}} key={`necklacear`} style={{
                    position: 'absolute',
                    left: neckPositionRef.current?.left+5,
                    top: neckPositionRef.current?.top,
                    backgroundColor: '#0f00',
                    height: 2 * coefficient,

                    width: 2 * coefficient,
                    transform: [{rotate: `${(Platform.OS === 'ios' ? 180:0)+angle}deg`},{scale:parseFloat((selectedNecklace?.scale||1))},{translateY:selectedNecklace?.scale?parseFloat(-coefficient /( selectedNecklace?.scale*8)||0):10}]
                    // Applica la rotazione

                }} resizeMode={"contain"}/>
            </>;

    }

    const nose = poses[0].keypoints.filter(e => e.score > MIN_KEYPOINT_SCORE && e.name?.includes('nose'))
    let noseCoordinates;
    if (nose?.length > 0)
        noseCoordinates = calculateCoordinates(nose[0], flipX, isPortrait);
    const noseCircle = noseCoordinates ?
        <Circle key={`skeletonkp_naso`} cx={noseCoordinates?.cx} cy={noseCoordinates?.cy} r='4' strokeWidth='2'
                fill='#00A' stroke='white'/> : <></>;

    let render;
    if (selectedEarrings) {
        render = keypoints.map(k => {
            const {cx, cy} = calculateCoordinates(k, flipX, isPortrait);

            const coefficient = 2.8;
            const width = (1 * distance) / coefficient;
            const height = (2.5 * distance) / coefficient;
            const distanceFromNose = Math.abs(noseCoordinates?.cx - cx);
            if (distanceFromNose < distance / 1.8)
                return null;
            return (
                <Image
                    key={`erarringsar`+k.name}
                    source={{ uri: selectedEarrings.image.replace(/ /g,"")}}
                    style={{position: 'absolute', left: cx - width / 1.8, top: cy + height / 8, height, width}}
                    resizeMode="contain"
                />
            );

        });
    }
    return <Svg style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 30
    }}>{render}{centerIcon}</Svg>;
};

export default PoseRenderer;
