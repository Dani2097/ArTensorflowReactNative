import React, { useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ProductsContext } from './ProductContenxt';

const PopupMenu =  ({visible, onClose }) => {
    const { setCategory } = useContext(ProductsContext);

    const handleCategorySelect = (category) => {
        setCategory(category);
        onClose();
    };
    if(!visible) return null;
    return (
        <View style={styles.menu}>
            <TouchableOpacity onPress={() => handleCategorySelect('earrings')}>
                <Text style={styles.menuItem}>Orecchini</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategorySelect('necklace')}>
                <Text style={styles.menuItem}>Collane</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
                <Text style={styles.menuItem}>Chiudi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 250,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    menu: {
        position: 'absolute',
        top: 50,  // Adjust this value based on the size of your icon and desired spacing
        right: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        zIndex: 100,
    },
    menuItem: {
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal:30,
        textAlign: 'center',
    },
});

export default PopupMenu;
