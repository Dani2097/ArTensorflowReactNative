import {MaterialCommunityIcons} from "@expo/vector-icons";
import {TouchableOpacity, View, StyleSheet, Text, Dimensions} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useContext, useEffect} from "react";
import FadeInView from "./FadeInView";
import {ProductsContext} from "../ProductContenxt";
import strings from "../strings";

export default function  WardrobeButton({setWardrobe}: {setWardrobe: Function}) {
    const [isMessageVisible, setIsMessageVisible] = React.useState(false);
    const {deviceLanguage} = useContext(ProductsContext)
    useEffect(() => {
        setIsMessageVisible(true)
        const timer = setTimeout(() => {
            setIsMessageVisible(false);
        }, 4000);
    },[])

    return (<>
            <FadeInView visible={isMessageVisible} style={styles.message}>
                <Text style={{color:'gold'}}>
                    {strings[deviceLanguage]['startMessage']}
                </Text>
            </FadeInView>
            <TouchableOpacity style={styles.button} onPress={() => setWardrobe()}>
                <MaterialCommunityIcons name="wardrobe-outline" size={40}  color="gold"/>
            </TouchableOpacity>
        </>
    );
}
const styles = StyleSheet.create({
    message: {
        position: 'absolute',
        bottom: 67,
        right: 52,
        zIndex: 9,
        maxWidth:Dimensions.get('window').width - 80,
        padding:8,
        borderRadius: 10,
        borderBottomEndRadius: 0,
        backgroundColor: 'rgba(25, 25,25, 0.9)',

    },
    button: {
        position: 'absolute',
        bottom: 13,
        right: 10,
        borderRadius: 50,
        backgroundColor: 'black',
        padding: 5,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex:9
    },

})
