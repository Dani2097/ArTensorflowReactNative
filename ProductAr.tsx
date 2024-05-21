import React, {useEffect, useState, useRef, useContext} from 'react';
import {StyleSheet, Text, View, Dimensions, Platform, Image, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import * as posedetection from '@tensorflow-models/pose-detection';
import * as ScreenOrientation from 'expo-screen-orientation';
import {cameraWithTensors} from '@tensorflow/tfjs-react-native';
import {CameraType} from 'expo-camera/build/Camera.types';
import {useOrientation} from "./components/utils/useOrientation";
import {Ionicons} from "@expo/vector-icons";
import {loadModel} from "./components/utils/loadModel";
import {ExpoWebGLRenderingContext} from "expo-gl";
import {
    CAM_PREVIEW_HEIGHT,
    CAM_PREVIEW_WIDTH,
    OUTPUT_TENSOR_HEIGHT,
    OUTPUT_TENSOR_WIDTH
} from "./components/utils/generic";
import PoseRenderer from "./components/PoseRenderer";
import firestore from '@react-native-firebase/firestore';
import {ProductsContext} from "./components/ProductContenxt";

const TensorCamera = cameraWithTensors(Camera);

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

const AUTO_RENDER = false;
const LOAD_MODEL_FROM_BUNDLE = false;


export default function ProductAr() {
    const cameraRef = useRef(null);
    const [tfReady, setTfReady] = useState(false);
    const [model, setModel] = useState<posedetection.PoseDetector>();
    const [poses, setPoses] = useState<posedetection.Pose[]>();
    // const [fps, setFps] = useState(0);
    const orientation = useOrientation();
    const [cameraType, setCameraType] = useState<CameraType>(Camera.Constants.Type.front);
    const frameCounter = useRef<number>(0);
    const rafId = useRef<number | null>(null);
    const {
        selectedEarrings,
        selectedNecklace,
        setSelectedEarrings,
        setSelectedNecklace,
        setOpenSelectedProductModal
    } = useContext(ProductsContext);

    useEffect(() => {
        async function prepare() {
            rafId.current = null;

            await Camera.requestCameraPermissionsAsync();
            await tf.ready();

            const model = await loadModel(LOAD_MODEL_FROM_BUNDLE);
            setModel(model);

            setTfReady(true);
        }

        prepare();
    }, []);

    useEffect(() => {
        return () => {
            if (rafId.current != null && rafId.current !== 0) {
                cancelAnimationFrame(rafId.current);
                rafId.current = 0;
            }
        };
    }, []);

    const handleCameraStream = async (
        images: IterableIterator<tf.Tensor3D>,
        updatePreview: () => void,
        gl: ExpoWebGLRenderingContext
    ) => {


        const loop = async () => {
            const imageTensor = images.next().value as tf.Tensor3D;
                if (!imageTensor) return;
                const startTs = Date.now();
                const poses = await model!.estimatePoses(imageTensor, undefined, Date.now());
                // const latency = Date.now() - startTs;
                setPoses(poses);
                // setFps(Math.floor(1000 / latency));
            tf.dispose([imageTensor]);


            if (!AUTO_RENDER) {
                updatePreview();
                gl.endFrameEXP();
            }

            rafId.current = requestAnimationFrame(loop);
        };

        loop();
    };

    const handleSwitchCameraType = () => {
        setCameraType(prev => prev === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front);
    };

    const getOutputTensorWidth = () => (isPortrait(orientation) || IS_ANDROID ? OUTPUT_TENSOR_WIDTH : OUTPUT_TENSOR_HEIGHT);
    const getOutputTensorHeight = () => (isPortrait(orientation) || IS_ANDROID ? OUTPUT_TENSOR_HEIGHT : OUTPUT_TENSOR_WIDTH);

    const getTextureRotationAngleInDegrees = () => {
        if (IS_ANDROID) return 0;
        switch (orientation) {
            case ScreenOrientation.Orientation.PORTRAIT_DOWN:
                return 180;
            case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
                return cameraType === Camera.Constants.Type.front ? 270 : 90;
            case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
                return cameraType === Camera.Constants.Type.front ? 90 : 270;
            default:
                return 0;
        }
    };

    if (!tfReady) {
        return (
            <View style={styles.loadingMsg}>
                <Text>Loading...</Text>
            </View>
        );
    } else {
        return (
            <View style={isPortrait(orientation) ? styles.containerPortrait : styles.containerLandscape}>
                <TensorCamera
                    ref={cameraRef}
                    style={styles.camera}
                    autorender={AUTO_RENDER}
                    type={cameraType}
                    resizeWidth={getOutputTensorWidth()}
                    resizeHeight={getOutputTensorHeight()}
                    resizeDepth={3}
                    rotation={getTextureRotationAngleInDegrees()}
                    onReady={handleCameraStream}
                />
                <PoseRenderer poses={poses} cameraType={cameraType} isPortrait={isPortrait(orientation)}/>
                {/*<View style={styles.fpsContainer}><Text>FPS: {fps}</Text></View>*/}


                {/*<View style={styles.cameraTypeSwitcher} onTouchEnd={handleSwitchCameraType}><Text>Switch*/}
                {/*    to {cameraType === Camera.Constants.Type.front ? 'back' : 'front'} camera</Text>*/}
                {/*</View>*/}
            </View>
        );
    }
}

const isPortrait = (orientation: ScreenOrientation.Orientation) => {
    return orientation === ScreenOrientation.Orientation.PORTRAIT_UP || orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;
};

const styles = StyleSheet.create({
    containerPortrait: {
        position: 'relative',
        width: CAM_PREVIEW_WIDTH,
        height: CAM_PREVIEW_HEIGHT,
        marginTop: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
    },
    containerLandscape: {
        position: 'relative',
        width: CAM_PREVIEW_HEIGHT,
        height: CAM_PREVIEW_WIDTH,
        marginLeft: Dimensions.get('window').height / 2 - CAM_PREVIEW_HEIGHT / 2,
    },
    loadingMsg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    fpsContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 80,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        borderRadius: 2,
        padding: 8,
        zIndex: 20,
    },
    cameraTypeSwitcher: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 180,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        borderRadius: 2,
        padding: 8,
        zIndex: 20,
    },
});
