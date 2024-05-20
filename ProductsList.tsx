import {TouchableOpacity, View, FlatList, Image, StyleSheet} from "react-native";
import React, {useContext} from "react";
import {ProductsContext} from "./components/ProductContenxt";

const ProductList = () => {
    const {
        //@ts-ignore
        products,
        //@ts-ignore
        selectedEarrings,
        //@ts-ignore
        setSelectedEarrings,
        //@ts-ignore
        selectedNecklace,
        //@ts-ignore
        setSelectedNecklace,
        //@ts-ignore
        category
    } = useContext(ProductsContext);

    const handlePress = (prod: any) => {
        if (prod.type === 'necklace') {
            if (selectedNecklace?.id === prod.id) {
                setSelectedNecklace(null);
            } else
                setSelectedNecklace(prod);
        } else {
            if (selectedEarrings?.id === prod.id) {
                setSelectedEarrings(null);
            } else
                setSelectedEarrings(prod);
        }
    };

    const renderItem = ({item}: any) => {
        const borderColor = item.id === selectedEarrings?.id ? 'gold' : item.id === selectedNecklace?.id ? 'orange' : 'transparent';

        return (
            <TouchableOpacity onPress={() => handlePress(item)}>
                <Image
                    source={{uri: item.urlImage.indexOf('https:') !== -1 ? item.urlImage : 'https:' + item.urlImage}}
                    style={[styles.image, {borderColor}]}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products.filter((prod) =>category? prod.type === category:true).filter((prod) => prod.type === 'necklace' ? selectedNecklace ? prod.id !== selectedNecklace.id : true : selectedEarrings ? prod.id !== selectedEarrings.id : true)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                // extraData={selectedProduct}
            />
        </View>
    );
};
export default ProductList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4e4e4',
        bottom: 0,
        zIndex:2000,
        position: 'absolute',
        paddingVertical:12,
        left: 0,
        right: 0,
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
    },
});
