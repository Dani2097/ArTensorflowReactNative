import React, {useEffect, useMemo} from "react";
import { BackHandler, Linking, } from "react-native";
import DLGWebView from "../WebView/DLGWebView";
import Loading from "./Loading";
import {WebView} from "react-native-webview";
import BottomNavigator from "./BottomNavigator";
import WardrobeButton from "../Ui/WardrobeButton";
const START_URL = 'https://deebcreazioni.it/';
export default function WebCommerce(props): JSX.Element {
    const ref = React.useRef<WebView>(null)
    const [loading, setLoading] = React.useState(false);
    const [firstLoad, setFirstLoad] = React.useState(false);
    const [urlWeb, setUrl] = React.useState('https://deebcreazioni.it/');
    const [startUrl, setStartUrl] = React.useState(START_URL);
    // if loading set loading to false after 5 seconds but clear timeout if loading changes
    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    },[loading]);

    // onfocus get params
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            console.log(props.route.params)
            setLoading(!!props.route?.params?.url)
            setStartUrl(props.route?.params?.url ? props.route.params?.url : START_URL)
            setUrl(props.route.params?.url)
        });
        return unsubscribe;
    })
    const backAction = useMemo(() => {
        return () => {
            if (urlWeb !== START_URL) {
                setLoading(true)
                ref.current?.goBack();
            } else {
                ref.current?.reload();
            }
            return true;
        };
    }, [urlWeb]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, [backAction]);
    return (
        <>
        <DLGWebView
            onLoadStart={({currentTarget}) => {
            }}
            onLoadEnd={() => {
                setFirstLoad(true);

                setLoading(false)
            }}
            onNavigationStateChange={({ url }) => {
                if(url!==urlWeb)
                    setLoading(false)
            }}
            onShouldStartLoadWithRequest={({ url }) => {
                setLoading(true)
                setUrl(url)
                if (
                    url.indexOf('https://')===-1 && url.indexOf('http://')===-1
                ) {
                    Linking.openURL(url);
                    ref.current?.stopLoading();
                    return false;
                }
                return true;
            }}
            mediaCapturePermissionGrantType={'prompt'}
            mediaPlaybackRequiresUserAction={false}
            _ref={ref} url={startUrl}
        />
            <Loading isLoading={loading}/>
            {firstLoad&&<WardrobeButton setWardrobe={() => {
                props.navigation.navigate('Ar')

            }}/>}
        </>
    )
}

