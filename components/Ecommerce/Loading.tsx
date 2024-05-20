import React from "react";
import {ActivityIndicator, Image, StyleSheet, Text, View} from "react-native";
// @ts-ignore
import logo from "../../assets/logo.png";
export default function Loading({isLoading}: {isLoading: boolean}): React.JSX.Element{
    if (!isLoading) return <View/>
    return (
        <View style={styles.loadingContainer}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.sentences}>{SENTENCES[Math.floor(Math.random() * SENTENCES.length)]}</Text>
            <ActivityIndicator  color={"#c5ab00"} size={"large"} />
        </View>
    )

}
const styles = StyleSheet.create({
    logo:{width: 100, height: 100},
    loadingContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    sentences:{marginVertical: 20, textAlign: "center",color: "#645702"}
})
const SENTENCES = [
    "La bigiotteria può includere materiali come vetro, plastica, e pietre semi-preziose.",
    '   Spesso viene utilizzato il termine "costume jewelry" per descriverla nei paesi anglofoni.',
    "    Coco Chanel ha reso popolare la bigiotteria negli anni '20 come accessorio alla moda.",
    "La bigiotteria può essere placcata in oro o argento per imitare gioielli più preziosi.",
    "    Gli antichi Egizi indossavano bigiotteria per mostrare status sociale e protezione spirituale.",
    "    Alcune bigiotterie vintage sono considerate pezzi da collezione di alto valore oggi.",
    "    La bakelite, una delle prime plastiche, era un materiale popolare per la bigiotteria negli anni '30 e '40.",
    "Molti designer di alta moda creano linee di bigiotteria come accessori per le loro collezioni.",
    "    La bigiotteria è spesso usata nel teatro e nel cinema per replicare gioielli costosi.",
    '    Il termine "bijouterie" deriva dal francese, significando gioielleria minuta.',
    "    I mercatini sono luoghi ottimali per trovare pezzi unici di bigiotteria vintage.",
    "    La bigiotteria spesso segue le tendenze della moda, aggiornandosi ogni stagione.",
    "    Alcune persone sono allergiche ai metalli comuni usati nella bigiotteria, come il nichel.",
    "    La bigiotteria può essere un modo economico per esprimere il proprio stile personale.",
    "    Durante la Seconda Guerra Mondiale, la bigiotteria era fatta con materiali non soggetti a razionamento.",
    "    Gli anni '80 hanno visto un aumento della popolarità di bigiotteria audace e colorata.",
    "La pulizia regolare può estendere la vita della tua bigiotteria mantenendola brillante.",
    "    La pietra di luna è una scelta popolare per la bigiotteria per il suo aspetto etereo.",
    "    Alcuni credono che certe pietre usate nella bigiotteria abbiano proprietà curative.",
    "    La lega di zinco è un metallo comune usato nella produzione di bigiotteria.",
    "    Gli orecchini a clip furono un'innovazione significativa nella bigiotteria per chi non aveva le orecchie forate.",
    "La bigiotteria è stata usata per segnalare l'appartenenza a gruppi sociali o club.",
    "L'art déco ha influenzato il design della bigiotteria con le sue linee geometriche e simmetria.",
    "La bigiotteria spesso imita gioielli di famosi designer, rendendoli accessibili a un pubblico più ampio.",
    "    I braccialetti charm sono una forma popolare di bigiotteria che permette personalizzazione.",
    "    Gli anelli di cocktail sono pezzi di bigiotteria espressivi, spesso con grandi pietre colorate.",
    '    Il termine "costume jewelry" è stato coniato negli anni 20 per descrivere gioielli da indossare con specifici "costumi" o abiti.',
    "Molte star di Hollywood degli anni d'oro indossavano bigiotteria sul set e nella vita privata.",
    "La bigiotteria ecologica utilizza materiali sostenibili e tecniche di produzione etiche.",
    "    La resina è diventata un materiale popolare nella bigiotteria moderna per la sua versatilità.",
    "    Le fiere di bigiotteria sono eventi globali dove designer e artigiani mostrano le loro ultime creazioni.",
    "    L'industria della bigiotteria ha visto una crescita esponenziale con l'avvento dell'e-commerce.",
    "Alcuni pezzi di bigiotteria diventano più preziosi con il passare del tempo, soprattutto se sono legati a una specifica era storica.",
    "    La bigiotteria può anche includere elementi come tessuti, legno e cuoio.",
    "    I collari per cani decorati con bigiotteria sono diventati un trend di moda per animali.,"
]
