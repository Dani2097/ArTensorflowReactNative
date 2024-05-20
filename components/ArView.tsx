import {TouchableOpacity, View, StyleSheet, Dimensions, Modal, Text} from "react-native";
import ProductAr from "../ProductAr";
import ProductsList from "../ProductsList";
import React, {useState} from "react";
import ArButtons from "./Ar/ArButtons";
import ProductsListFullPage from "../ProductsListFullPage";
import {ProductsContext} from "./ProductContenxt";

export default function ArView(props) {
    const {openSelectedProductModal, setOpenSelectedProductModal,setSelectedEarrings, setSelectedNecklace} = React.useContext(ProductsContext);
    console.log(openSelectedProductModal)
    return (
        // @ts-ignore
        <View style={{
            minHeight: Dimensions.get('window').height,
            maxHeight: Dimensions.get('window').height
        }}>
            <ArButtons {...props}/>
            <ProductAr/>
            <ProductsList/>
            <ProductsListFullPage/>
            <Modal transparent visible={!!openSelectedProductModal} animationType={'slide'}>
                <View style={{...Dimensions.get('window'), justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 12,
                        paddingBottom: 8,
                        paddingTop: 4,
                        minWidth: 100,
                        borderRadius: 12,
                        elevation: 12
                    }}>
                        <Text
                            style={{
                                color: '#ffae00',
                                borderBottomWidth: 1,
                                marginBottom: 2,
                                borderBottomColor: "#ffae00",
                                padding: 4
                            }}>
                            {openSelectedProductModal?.title || getTitleFromUrl(openSelectedProductModal?.urlImage)}
                        </Text>
                        <TouchableOpacity onPress={()=>{
                            if(openSelectedProductModal?.type === 'earrings') setSelectedEarrings(null);
                            if(openSelectedProductModal?.type === 'necklace') setSelectedNecklace(null);
                            setOpenSelectedProductModal(false)
                        }}><Text style={{fontSize: 12, padding: 4}}>Deselect</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setOpenSelectedProductModal(false)
            props.navigation.navigate('Products', {url: openSelectedProductModal?.url})
                        }}><Text style={{fontSize: 12, padding: 4}}>Show In
                            Market</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpenSelectedProductModal(false)}><Text
                            style={{fontSize: 12, padding: 4}}>Chiudi</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}



function getTitleFromUrl(urlImage: string) {
    return urlImage?.split('/')[urlImage?.split('/')?.length - 1].split('.')[0].toUpperCase().replace(/-/g, ' ')
}
