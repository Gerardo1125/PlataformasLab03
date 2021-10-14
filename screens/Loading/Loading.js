import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { StatusBar, ActivityIndicator, View, Image, Animated } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { c, BaseColor } from "@config";

//import { useAuth } from '../../constants/provider';

import { useSelector, useDispatch } from 'react-redux';


export default function Loading(props) {
  const { navigate } = props.navigation;
  const [flag, setFlag] = useState(true)
  //const { getAuthState } = useAuth();
  //const { state, handleLogout } = useAuth();
  //const [login, setCount] = useState(null);

  //const { user } = useSelector(state => state.userReducer);
  //const userData = state.user;

  /*
    const { user } = useSelector(state => state.userReducer);
    console.log("////////////////////////////////")
    console.log(user)*/

  useEffect(() => {
    const timeout = setTimeout(() => {
      //let loginToken = AsyncStorage.getItem('user')

      props.navigation.navigate('AppHome')

      //initialize();
      //props.navigation.navigate('Login')
    }, 1500);
  }, []);





  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' />
      <Image
        source={require('../../assets/User.png')}
        style={styles.logo} resizeMode="contain" />
      <ActivityIndicator
        size="large"
        color={BaseColor.whiteColor}
        style={{
          marginTop: 20
        }}
      />
    </View>
  );
};