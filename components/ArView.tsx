import {TouchableOpacity, View, StyleSheet, Dimensions, Modal, Text, Platform, Image} from "react-native";
import ProductAr from "../ProductAr";
import ProductsList from "../ProductsList";
import React, {useState} from "react";
import ArButtons from "./Ar/ArButtons";
import ProductsListFullPage from "../ProductsListFullPage";
import {ProductsContext} from "./ProductContenxt";

export default function ArView(props) {
    const {
        selectedEarrings,
        selectedNecklace,
        openSelectedProductModal,
        setOpenSelectedProductModal,
        setSelectedEarrings,
        setSelectedNecklace
    } = React.useContext(ProductsContext);
    console.log(openSelectedProductModal)
    return (
        // @ts-ignore
        <View style={{
            minHeight: Dimensions.get('window').height,
            maxHeight: Dimensions.get('window').height
        }}>
            <ArButtons {...props}/>
            <ProductAr/>
            <View style={styles.thumbNails}>
                {selectedEarrings &&
                    <TouchableOpacity onPress={() => setOpenSelectedProductModal(selectedEarrings)}
                                      style={{overflow: 'visible', marginRight: 12}}>
                        <Image source={{uri: selectedEarrings.urlImage.replace(/ /g, '')}}
                               style={styles.imageThumb}
                               width={40} height={40}/>
                    </TouchableOpacity>}
                {selectedNecklace &&
                    <TouchableOpacity onPress={() => setOpenSelectedProductModal(selectedNecklace)}
                                      style={{overflow: 'visible', marginRight: 12}}>
                        <Image source={{uri: selectedNecklace.urlImage.replace(/ /g, '')}}
                               style={styles.imageThumb}
                               width={40} height={40}/>
                    </TouchableOpacity>}
            </View>
            <ProductsList/>
            <ProductsListFullPage/>
            <Modal transparent visible={!!openSelectedProductModal} animationType={'slide'}>
                <View style={{...Dimensions.get('window'), justifyContent: 'center', alignItems: 'center'}}>
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
                            <Text style={{fontSize: 12, padding: 4}}>Deselect</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setOpenSelectedProductModal(false)
                            props.navigation.navigate('Products', {url: openSelectedProductModal?.url})
                        }}>
                            <Text style={{fontSize: 12, padding: 4}}>Show In
                                Market
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpenSelectedProductModal(false)}>
                            <Text style={{fontSize: 12, padding: 4}}>Chiudi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
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
        elevation: 12
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
        bottom: Platform.OS === 'ios' ? 150 : 45,
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
