import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import React, {useState} from "react";
import {ProductsContext} from "../ProductContenxt";

export default function ArButtons(props) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const {showList, setShowList, setCategory, category} = React.useContext(ProductsContext)

    const openMenu = () => {
        setIsMenuVisible(prev => !prev);
    }
    const closeMenu = () => {
        setIsMenuVisible(false);
    }
    return <View style={styles.container}>
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Products')}
                              style={[styles.button, styles.backButton]}>
                <MaterialCommunityIcons name="shopping" size={18} color={"black"}/>
            </TouchableOpacity>
            <Image resizeMode={'contain'} source={require('../../assets/deeb.png')} style={styles.image}/>
        </View>
        <View style={styles.iconContainer} onPress={openMenu}>
            <TouchableOpacity onPress={() => setCategory(prev=>prev==='earrings'?'':'earrings')}
                              style={[styles.button, {backgroundColor: category === 'earrings' ? 'black' : 'gold'}]}>
                <SimpleLineIcons name="drop" size={18} color={category === 'earrings' ? 'gold' : "black"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCategory(prev=>prev==='necklace'?'':'necklace')}
                              style={[styles.button, {backgroundColor: category === 'necklace' ? 'black' : 'gold'}]}>
                <MaterialCommunityIcons name="necklace" size={18} color={category === 'necklace' ? 'gold' : "black"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowList(prev => !prev)} style={styles.button}>
                <Text>{showList ? "Chiudi" : "Visualizza Tutti"}</Text>
            </TouchableOpacity>
        </View>
    </View>
}
const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        width: '100%',
        paddingBottom: 5,
    },
    image: {
        height: 50,
        width: 230,
    },
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 6,
        right: 0,
        elevation: 4,
        zIndex: 10,
    },
    iconContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 8,
        backgroundColor: 'gold',
        borderRadius: 8,
        minHeight: 30,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
        elevation: 4
    },
    backButton: {
        position: 'absolute',
        top: 6,
        left: 6,
        padding: 8,
    }
})
