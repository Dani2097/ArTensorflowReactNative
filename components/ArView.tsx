import {SafeAreaView,TouchableOpacity, View, StyleSheet, Dimensions, Modal, Text, Platform, Image} from "react-native";
import ProductAr from "../ProductAr";
import ProductsList from "../ProductsList";
import React, {useState} from "react";
import ArButtons from "./Ar/ArButtons";
import ProductsListFullPage from "../ProductsListFullPage";
import {ProductsContext} from "./ProductContenxt";
import strings from "./strings";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function ArView(props) {
    const {
        selectedEarrings,
        selectedNecklace,
        openSelectedProductModal,
        setOpenSelectedProductModal,
        setSelectedEarrings,
        setSelectedNecklace,
        deviceLanguage
    } = React.useContext(ProductsContext);
    const insets=useSafeAreaInsets();
    console.log(insets)
    console.log({deviceLanguage})
    return (
        // @ts-ignore
<SafeAreaView>
    <View style={{
            minHeight: "100%",
            maxHeight: "100%"
        }}>
            <ArButtons {...props}/>
            <ProductAr/>
            {/*@ts-ignore*/}
            <View style={styles.thumbNails}>
                {selectedEarrings &&
                    <TouchableOpacity onPress={() => setOpenSelectedProductModal(selectedEarrings)}
                                      style={{overflow: 'visible', marginRight: 12}}>
                        {/*@ts-ignore*/}
                        <Image source={{uri: selectedEarrings.urlImage.replace(/ /g, '')}}
                               style={styles.imageThumb}
                               width={40} height={40}/>
                    </TouchableOpacity>}
                {selectedNecklace &&
                    <TouchableOpacity onPress={() => setOpenSelectedProductModal(selectedNecklace)}
                                      style={{overflow: 'visible', marginRight: 12}}>
                        {/*@ts-ignore*/}
                        <Image source={{uri: selectedNecklace.urlImage.replace(/ /g, '')}}
                               style={styles.imageThumb}
                               width={40} height={40}/>
                    </TouchableOpacity>}
            </View>
            <ProductsList/>
            <ProductsListFullPage/>
            <Modal transparent visible={!!openSelectedProductModal} animationType={'slide'}>
                {/*@ts-ignore*/}
                <View style={{...Dimensions.get('window'), justifyContent: 'center', alignItems: 'center'}}>
                    {/*@ts-ignore*/}
                    <View style={styles.modalContainer}>
                        <Text
                            style={styles.modaleText}>
                            {openSelectedProductModal?.title || getTitleFromUrl(openSelectedProductModal?.urlImage)}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            if (openSelectedProductModal?.type === 'earrings') setSelectedEarrings(null);
                            if (openSelectedProductModal?.type === 'necklace') setSelectedNecklace(null);
                            setOpenSelectedProductModal(false)
                        }}>
                            {/*@ts-ignore*/}
                            <Text style={{fontSize: 12, padding: 4}}>
                                {strings[deviceLanguage]['Deseleziona']}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setOpenSelectedProductModal(false)
                            props.navigation.navigate('Products', {url: openSelectedProductModal?.url})
                        }}>
                            {/*@ts-ignore*/}
                            <Text style={{fontSize: 12, padding: 4}}>
                                {strings[deviceLanguage]['Visualizza in negozio']}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpenSelectedProductModal(false)}>
                            {/*@ts-ignore*/}
                            <Text style={{fontSize: 12, padding: 4}}>
                                {strings[deviceLanguage]['Chiudi']}

                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    </View>
</SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingBottom: 8,
        paddingTop: 4,
        minWidth: 100,
        borderRadius: 12,
        elevation: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
    }, modaleText: {
        color: '#ffae00',
        borderBottomWidth: 1,
        marginBottom: 2,
        borderBottomColor: "#ffae00",
        padding: 4
    },imageThumb:{
        width: 40, height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'gold',
    },
    thumbNails:{
        bottom: Platform.OS === 'ios' ? 150 : 150,
        borderRadius: 8,
        left: 12,
        position: 'absolute',
        flexDirection: 'row',
        padding: 3,
        gap: 4,
        zIndex: 3000
    }
})

function getTitleFromUrl(urlImage: string) {
    return urlImage?.split('/')[urlImage?.split('/')?.length - 1].split('.')[0].toUpperCase().replace(/-/g, ' ')
}
