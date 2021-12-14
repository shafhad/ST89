import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
} from 'react-native';
import firebase from "firebase";

import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

export default class CustomSidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true
        };
    }

    componentDidMount() {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                theme = snapshot.val().current_theme
            })
        this.setState({ light_theme: theme === "light" ? true : false })
    }

    render() {
        let props = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: this.state.light_theme ? "white" : "#15193c" }}>
                <Image source={require("../assets/logo.png")} style={styles.sideMenuProfileIcon}></Image>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'contain',
        width: 150,
        height: 150,
        borderRadius: 100 / 2,
        alignSelf: 'center',
        marginTop: 60
    },
    titleText: {
        textAlign: "center",
        color: "white",
        fontSize: 28,
        fontFamily: "Bubblegum-Sans",
        marginTop: 30
    }
});