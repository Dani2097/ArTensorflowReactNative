import * as posedetection from '@tensorflow-models/pose-detection';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

export const loadModel = async (loadFromBundle: boolean) => {
    const movenetModelConfig: posedetection.MoveNetModelConfig = {
        modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true,
    };

    if (loadFromBundle) {
        const modelJson = require('../../offline_model/model.json');
        const modelWeights1 = require('../../offline_model/group1-shard1of2.bin');
        const modelWeights2 = require('../../offline_model/group1-shard2of2.bin');
        movenetModelConfig.modelUrl = bundleResourceIO(modelJson, [modelWeights1, modelWeights2]);
    }

    return posedetection.createDetector(posedetection.SupportedModels.MoveNet, movenetModelConfig);
};
