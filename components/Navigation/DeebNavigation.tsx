import * as React from 'react';
import {Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebCommerce from "../Ecommerce/WebCommerce";
import ProductAr from "../../ProductAr";
import ArView from "../ArView";
// import ProductDetailScreen from './screens/ProductDetailScreen';

export type RootStackParamList = {
    Products: undefined;
    ProductDetail: { productId: number };
    Ar: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function DeebNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Products" component={WebCommerce} options={{ headerShown: false }} />
                <Stack.Screen name="Ar" component={ArView} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const Test=()=><Text>Test</Text>

export default DeebNavigation;
