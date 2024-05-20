import React from 'react';
import { WebView } from 'react-native-webview';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
// import { ActivityIndicator } from 'react-native-paper';

// Definizione dell'utility type RequireAtLeastOne
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
    {
        [K in Keys]-?: Required<Pick<T, K>> &
            Partial<Record<Exclude<Keys, K>, undefined>>;
    }[Keys];

// Estensione delle props di WebView per includere _ref e rendere obbligatorio almeno `url` o `source`
interface BaseProps extends React.ComponentProps<typeof WebView> {
    wError?: boolean;
    _ref: React.RefObject<WebView>;
}

interface CustomProps {
    url?: string;
    source?: React.ComponentProps<typeof WebView>['source'];
}

type Props = RequireAtLeastOne<CustomProps> & BaseProps;

const DLGWebView: React.FC<Props> = ({
    _ref,
    wError,
    url,
    source,
    ...props
}) => {
    const webViewSource = url
        ? { uri: url.replace('http:', 'https:') }
        : source;
    return (
        <WebView
            renderError={wError ? RenderError : undefined}
            onError={() => {
                setTimeout(() => {
                    _ref?.current?.reload();
                }, 500);
            }}
            source={webViewSource}
            {...props}
            ref={_ref}
        />
    );
};
const RenderError = () => (
    <View style={{ flex: 1 }}>
        <View style={styles.loadingContainer}>
            <ActivityIndicator />
        </View>
    </View>
);
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        height: Dimensions.get('window').height,
        backgroundColor: 'white',
    },
});
export default DLGWebView;
