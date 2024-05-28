import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {ProductsContext, ProductsProvider} from "./components/ProductContenxt";
import ProductsList from "./ProductsList";
import ProductAr from "./ProductAr";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import PopupMenu from "./components/PopupMenu";
import WebCommerce from "./components/Ecommerce/WebCommerce";
import BottomNavigator from "./components/Ecommerce/BottomNavigator";
import WardrobeButton from "./components/Ui/WardrobeButton";
import ProductsListFullPage from "./ProductsListFullPage";
import DeebNavigation from "./components/Navigation/DeebNavigation";

function App() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const {showAr, showList, setShowList,setShowAr} = React.useContext(ProductsContext);
    const openMenu = () => {
        setIsMenuVisible(prev => !prev);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    };
    return (
        <>
            {/*{!showAr && !showList && <WebCommerce/>}*/}
            {/*{showAr && <View>*/}
            {/*    <TouchableOpacity style={styles.iconContainer} onPress={openMenu}>*/}
            {/*        <>*/}
            {/*        <Ionicons name="md-menu" size={32} color="black"/>*/}
            {/*        </>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <ProductAr/>*/}
            {/*    <ProductsList/>*/}
            {/*    <PopupMenu visible={isMenuVisible} onClose={closeMenu}/>*/}
            {/*</View>}*/}
            {/*{showList && <ProductsListFullPage/>}*/}
            <DeebNavigation/>

        </>
    );
}

export default ()=> <ProductsProvider><App/></ProductsProvider>;
