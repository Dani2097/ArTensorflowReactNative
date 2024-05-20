import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// @ts-ignore
import earrings from "../../assets/3210069.png";

const START_URL = 'https://deebcreazioni.it/';
const WEARING_URL = 'https://deebcreazioni.it/35-indossa-virtualmente'
export default function BottomNavigator({url, setUrl}: { url: string, setUrl: Function }): React.JSX.Element {
    return (
        <View style={styles.container}>
            <SingleNav
                icon={'home-variant-outline'}
                text={'Home'}
                color={url === START_URL ? '#c5ab00' : 'black'}
                onPress={() => setUrl(START_URL)}
            />
            <SingleNav
                icon={'necklace'}
                text={'Indossa'}
                color={url === WEARING_URL ? '#c5ab00' : 'black'}
                onPress={() => setUrl(WEARING_URL)}
            />

        </View>
    )
}

interface NavProps {
    icon: string
    text: string
    onPress: () => void
    color?: string
}

const SingleNav = ({icon, text, onPress, color = 'black'}: NavProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={{alignItems: 'center'}}>
            <MaterialCommunityIcons name={icon} size={30} color={color}/>
            <Text style={{color, fontSize: 12}}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 5,
        // left: 0,
        // right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 30,
        alignItems: 'center',
        borderRadius: 50,
        paddingHorizontal: 24,
        paddingVertical: 10,
        elevation: 5,
        alignSelf: 'center',
        backgroundColor: '#fff',
    },

})
