import {Dimensions, Platform} from "react-native";

export const calculateCoordinates = (keypoint, flipX, isPortrait) => {
    const x = flipX ? getOutputTensorWidth(isPortrait) - keypoint.x : keypoint.x;
    const y = keypoint.y;
    const cx = (x / getOutputTensorWidth(isPortrait)) * (isPortrait ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT);
    const cy = (y / getOutputTensorHeight(isPortrait)) * (isPortrait ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH);

    return { cx, cy };
};

export const calculateCenter = (coord1, coord2) => {
    const centerX = (coord1.x + coord2.x) / 2;
    const centerY = (coord1.y + coord2.y) / 2;

    return { centerX, centerY };
};

const getOutputTensorWidth = (isPortrait) => (isPortrait ? OUTPUT_TENSOR_WIDTH : OUTPUT_TENSOR_HEIGHT);
const getOutputTensorHeight = (isPortrait) => (isPortrait ? OUTPUT_TENSOR_HEIGHT : OUTPUT_TENSOR_WIDTH);

const CAM_PREVIEW_WIDTH = Dimensions.get('window').width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (Platform.OS === 'ios' ? 9 / 16 : 3 / 4);
const OUTPUT_TENSOR_WIDTH = 180;
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (Platform.OS === 'ios' ? 9 / 16 : 3 / 4);
const MIN_KEYPOINT_SCORE = 0.25;

export {CAM_PREVIEW_HEIGHT, CAM_PREVIEW_WIDTH, OUTPUT_TENSOR_WIDTH, OUTPUT_TENSOR_HEIGHT,MIN_KEYPOINT_SCORE}
