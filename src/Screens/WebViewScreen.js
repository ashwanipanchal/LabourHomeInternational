import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, ScrollView, Platform, Image, SafeAreaView, StatusBar } from "react-native";
import RenderHtml from 'react-native-render-html';
import { StatusBarLight } from "../Custom/CustomStatusBar";
import { HeaderDark } from "../Custom/CustomView";
// import { Header } from "../Custom/CustomView";

const SCREEN_WIDTH = Dimensions.get("window").width;

const WebViewScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState(route.params.title)

    function getTag() {
        return {
            p: { color: '#000' },
            a: { color: '#000', textDecorationLine: 'none' },
            h3: { color: '#000' },
            li: { color: '#000' },
            ul: { color: '#000' },
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBarLight /> */}
            {Platform.OS === 'ios' ?
                <View style={{
                    width: "100%", position: 'absolute', top: 0, left: 0, height: 50,
                    backgroundColor: '#31B9EB'
                }}>
                    <StatusBar barStyle={"light-content"} translucent={true} {...navigation} />
                </View>
                :
                <StatusBarLight />
            }
            <HeaderDark onPress={() => navigation.goBack()} title={title} height={Platform.OS === 'ios' ? 40 : 85} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, paddingHorizontal: 15, marginBottom: 20 }}>
                <RenderHtml
                    style={{ fontSize: 20, color: '#000' }}
                    contentWidth={SCREEN_WIDTH / 1}
                    tagsStyles={getTag()}
                    source={{ html: `<div><p>${route.params.url}</p></div>` }} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default WebViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff',
    },
});