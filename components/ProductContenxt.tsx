import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Modal, View, Text, Dimensions, TouchableOpacity} from "react-native";
import { NativeModules, Platform } from 'react-native';

export const ProductsContext = createContext(null);

export const ProductsProvider = ({children}: any) => {
    const [products, setProducts] = useState([]);
    const [selectedEarrings, setSelectedEarrings] = useState(null);
    const [selectedNecklace, setSelectedNecklace] = useState(null);
    const [category, setCategory] = useState(null);
    const [showAr, setShowAr] = useState(false);
    const [showList, setShowList] = useState(false);
    const [openSelectedProductModal, setOpenSelectedProductModal] = useState<boolean | {
        id: string,
        title: string,
        urlImage: string
    }>(false);

    const deviceLanguage =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;

    useEffect(() => {
        const fetchProducts = async () => {
            const snapshot = await firestore().collection('Prodotti').get();
            const productsList = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setProducts(productsList);
        };

        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{
            showAr,
            setShowAr,
            showList,
            setShowList,
            products,
            deviceLanguage:deviceLanguage ==='it_IT'?deviceLanguage:'other',
            selectedEarrings,
            setSelectedEarrings,
            selectedNecklace,
            setSelectedNecklace,
            category,
            setCategory,
            openSelectedProductModal,
            setOpenSelectedProductModal
        }}>
            {children}

        </ProductsContext.Provider>
    );
};


