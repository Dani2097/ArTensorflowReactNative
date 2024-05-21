import {
    TouchableOpacity,
    View,
    FlatList,
    Image,
    StyleSheet,
    Text,
    Dimensions,
    StatusBar,
    BackHandler
} from "react-native";
import React, {useContext, useEffect} from "react";
import {ProductsContext} from "./components/ProductContenxt";
import FadeInView from "./components/Ui/FadeInView";

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
        category,
        //@ts-ignore
        setShowList,
        //@ts-ignore
        setShowAr,
        // @ts-ignore
        showList
    } = useContext(ProductsContext);
    const backAction = () => {
        setShowList(false);
        return true;

    };
    // onback close
    useEffect(() => {

        let backHandler:any;

        if (showList) {
            backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => backHandler?.remove();
        }
        if (backHandler)
            return backHandler.remove();
        return () => {
        };

    }, [showList])
    const handlePress = (prod: any) => {
        if (prod.type === 'necklace') {
            if (selectedNecklace?.id === prod.id) {
                setSelectedNecklace(null);
            } else {
                setSelectedNecklace(prod);
                setShowAr(true);
                setShowList(false);
            }
        } else {
            if (selectedEarrings?.id === prod.id) {
                setSelectedEarrings(null);
            } else {
                setSelectedEarrings(prod);
                setShowAr(true);
                setShowList(false);
            }
        }
    };

    const renderItem = ({item}: any) => {
        const borderColor = item.id === selectedEarrings?.id ? 'gold' : item.id === selectedNecklace?.id ? 'orange' : 'transparent';

        return (
            <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContainer}>
                <Image
                    source={{uri: item.urlImage.indexOf('https:') !== -1 ? item.urlImage : 'https:' + item.urlImage}}
                    style={[styles.image, {borderColor}]}
                />
            </TouchableOpacity>
        );
    };

    return (
        <FadeInView visible={showList} style={{...styles.container, zIndex: showList ? 12000 : -2}}>
            <Text style={styles.title}>Prodotti indossabili</Text>
            <FlatList
                data={products}
                /*@ts-ignore*/
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />

        </FadeInView>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 20,
        position: 'absolute',
        top: 114,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffce00',

        marginBottom: 20,
    },
    flatListContent: {

        justifyContent: "space-between",
        width: Dimensions.get("window").width,
        backgroundColor: 'red',
        alignItems: 'flex-start',
    },
    itemContainer: {
        flex: 1,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        maxWidth: Dimensions.get("window").width / 2 - 48,
        height: Dimensions.get("window").width / 2 - 48,
        margin: 10,
    },
    image: {
        width: Dimensions.get("window").width / 2 - 48,
        height: Dimensions.get("window").width / 2 - 48,
        borderRadius: 20,
        borderWidth: 2,
        // borderRadius: 10,
    },
});
