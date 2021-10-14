import React from 'react';

import { createAppContainer } from "react-navigation";

import { createSwitchNavigator } from 'react-navigation';

import HomeStack from './home';

import Loading from '../screens/Loading/Loading';


//import firebase from 'firebase';

/*
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
}



firebase.initializeApp(firebaseConfig)*/

const AppStack = createSwitchNavigator(
    {
        Loading: Loading,
        AppHome: HomeStack,
    },
    { initialRouteName: 'Loading' }
);

const Navigator = createAppContainer(AppStack);

export default function Router(props) {
    return (
        <Navigator />
    );
}