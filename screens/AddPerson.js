import React, { useState, useEffect } from "react"

import { View, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native"
import { BaseStyle, BaseColor, FontFamily } from "@config";
import { SafeAreaView, Header, Icon, Button, Text } from "@components";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import styles from "./styles";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Overlay } from "react-native-elements";
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";

import { addUser } from "../store/actions";
import { useSelector, useDispatch } from 'react-redux';

const AddPerson = props => {

    const [dateString, setDateString] = useState(new Date(1598051730000))
    const [isVisible, setIsVisible] = useState(false);
    const [dateStringAux, setDateStringAux] = useState('1998-10-10')
    const [modalVisible, setModelVisible] = useState(false)
    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState();
    const [latitudDelta, setLatitudeDelta] = useState(0);
    const [longitudeDelta, setLongitudeDelta] = useState(0);
    const [location, setLocation] = useState('Ubicación');
    const [errror, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [idValidate, setIdValidate] = useState(true);

    const [name, setName] = useState()
    const [lastName, setLastName] = useState()
    const [dni, setDNI] = useState()
    const [number, setNumber] = useState()
    const [height, setHeight] = useState()

    const dispatch = useDispatch();

    const addToBookmarkList = book => dispatch(addUser(book));
    const handleAddBookmark = book => {
        addToBookmarkList(book);
    };

    useEffect(() => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateString;
        console.log("AA", selectedDate)
        console.log(currentDate)
        setDateString(currentDate);
        setModelVisible(false);

    };

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();

        if (!enabled) {
            Alert.alert(
                'Location Service not enabled',
                'Please enable your location services to continue',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        } else {
            console.log(enabled)
            //setLocationServiceEnabled(enabled);
        }
    };

    const GetCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Permission not granted',
                    'Allow the app to use location service.',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            }
            try {
                let { coords } = await Location.getCurrentPositionAsync({ accuracy: 6 });
                if (coords) {
                    const { latitude, longitude } = coords;
                    let response = await Location.reverseGeocodeAsync({
                        latitude,
                        longitude
                    });
                    setLatitud(latitude)
                    setLongitud(longitude)
                    setLatitudeDelta(0.001)
                    setLongitudeDelta(0.001)
                    for (let item of response) {
                        let address = `${item.street} ${item.name}, ${item.city}`;
                        console.log("ADDRESS", address)
                        setLocation(address)
                        //setDisplayCurrentAddress(address);
                    }
                    const loca = {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.001,
                        longitudDelta: 0.001
                    }
                    //setRegion(loca)
                }
            } catch (e) {
                console.log('getCurrentPositionAsync error', e);
                let location = await Location.getLastKnownPositionAsync();
                if (location == null) {
                    Alert.alert(
                        "Geolocation failed",
                        "Your position could not be detected",
                        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                    );
                } else {
                    console.log(location.coords.latitude + " " + location.coords.longitude)
                    setLatitud(location.coords.latitude)
                    setLongitud(location.coords.longitude)
                    setLatitudeDelta(0.001)
                    setLongitudeDelta(0.001)
                    const loca = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.001,
                        longitudDelta: 0.001
                    }
                    //setRegion(loca)
                    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.coords.latitude + ',' + location.coords.longitude
                        + '&key=AIzaSyC2lXFhtyWxIwnmcqTfYCS3B8uX7uamOn0')
                        .then(res => res.json())
                        .then(response => {
                            //console.log(response.results)
                            setLocation(response.results[0].address_components[1].long_name + " " + response.results[0].address_components[0].long_name + ", " + response.results[0].address_components[2].long_name);
                            console.log(response.results[0].address_components[1].long_name + " " + response.results[0].address_components[0].long_name + ", " + response.results[0].address_components[2].long_name);
                        },
                            (error) => {
                                setErrorMsg(error);
                            })
                }
            }
        } catch (e) {
            console.log('askAsync error', e);
        }
    };

    function MapLocation() {

        const [newRegion, setRegion] = useState(null)

        const confirmLocation = () => {
            console.log(newRegion)
            if (newRegion === null) {
                console.log("AEAE")
                setIsVisible(false)
                return
            }
            setLatitud(newRegion.latitude)
            setLongitud(newRegion.longitude)
            console.log(newRegion.latitude)
            console.log(newRegion.longitude)



            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + newRegion.latitude + ',' + newRegion.longitude
                + '&key=AIzaSyC2lXFhtyWxIwnmcqTfYCS3B8uX7uamOn0')
                .then(res => res.json())
                .then(response => {
                    //console.log(response.results)
                    setLocation(response.results[0].address_components[1].long_name + " " + response.results[0].address_components[0].long_name + ", " + response.results[0].address_components[2].long_name);
                    console.log(response.results[0].address_components[1].long_name + " " + response.results[0].address_components[0].long_name + ", " + response.results[0].address_components[2].long_name);
                },
                    (error) => {
                        setErrorMsg(error);
                    })

            setIsVisible(false)

        }

        return (
            <Overlay
                isVisible={isVisible}
                overlayStyle={{ width: "90%" }}
                onBackdropPress={() => setIsVisible(false)}
            >
                <View>
                    {longitud &&
                        <MapView
                            style={{ width: '100%', height: 550 }}
                            initialRegion={{
                                latitude: latitud,
                                longitude: longitud,
                                latitudeDelta: 0.001,
                                longitudeDelta: 0.001,
                            }}
                            onRegionChange={(region) => setRegion(region)}
                        /*onRegionChange={(region) => {
                          setLatitud(region.latitude)
                          setLongitud(region.longitude)
                          setLatitudeDelta(region.latitudeDelta)
                          setLongitudeDelta(region.longitudeDelta)
                        }}*/

                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: newRegion ? newRegion.latitude : latitud,
                                    longitude: newRegion ? newRegion.longitude : longitud
                                }}
                                //onRegionChange={(region) => setRegion(region)}
                                draggable

                            />

                        </MapView>
                    }
                    <View
                        style={{ flexDirection: "row", marginTop: 10 }}
                    >
                        <View style={{ flex: 5, marginRight: 5 }}>
                            <Button
                                loading={loading}
                                style={{ marginTop: 20 }}
                                onPress={() => setIsVisible(false)}
                            >
                                Cancelar
                            </Button>
                        </View>
                        <View style={{ flex: 5, marginRight: 5 }}>
                            <Button
                                onPress={confirmLocation}
                                loading={loading}
                                style={{ marginTop: 20 }}
                            >
                                Guardar
                            </Button>
                        </View>
                    </View>
                </View>
            </Overlay>
        )
    }

    function pickValidate() {
        if (name === "" || lastName === "" || dni === "" || number === "" || height === "") {
            setIdValidate(false)
        } else {
            if (location === 'Ubicación') {
                Alert.alert(
                    'Ubicación no detectada',
                    'Activa la ubicación para poder continuar',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            } else {
                setIdValidate(true)
                const person = {
                    name: name,
                    lastName: lastName,
                    dni: dni,
                    number: number,
                    location: location,
                    height: height,
                    date: String(dateString.getDate()) + "/" + String(dateString.getMonth()) + "/" + String(dateString.getFullYear()),
                    image: 'https://picsum.photos/200/300?random=2'
                }
                console.log(person)
                handleAddBookmark(person)

                setName(''); setLastName(''); setDNI(''); setNumber(''); setHeight(''),
                Alert.alert(
                    'Agregado',
                    'Persona agregada satisfactoriamente',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                {modalVisible && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateString}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <Header
                    title="INGRESE DATOS "

                />
                <ScrollView>
                    <View style={styles.contain}>
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 15, }]}
                            onChangeText={text => setName(text)}
                            autoCorrect={false}
                            placeholder="NOMBRE"
                            placeholderTextColor={
                                idValidate
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={name}
                            selectionColor={BaseColor.primaryColor}
                        />
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 15, }]}
                            onChangeText={text => setLastName(text)}
                            autoCorrect={false}
                            placeholder="APELIIDOS"
                            placeholderTextColor={
                                idValidate
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={lastName}
                            selectionColor={BaseColor.primaryColor}
                        />
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 15, }]}
                            onChangeText={text => setDNI(text)}
                            autoCorrect={false}
                            placeholder="DNI O CARNET"
                            placeholderTextColor={
                                idValidate
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={dni}
                            keyboardType="numeric"
                            selectionColor={BaseColor.primaryColor}
                        />
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 15, }]}
                            onChangeText={text => setNumber(text)}
                            autoCorrect={false}
                            placeholder="TELEFONO"
                            placeholderTextColor={
                                idValidate
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={number}
                            keyboardType="numeric"
                            selectionColor={BaseColor.primaryColor}
                        />

                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={styles.itemPick}
                                onPress={() => { setModelVisible(true) }}
                            >
                                <Text caption1 light style={{ marginBottom: 5, marginTop: 10 }}>
                                    Fecha de Nacimiento
                                </Text>
                                <Text headline semibold>
                                    {String(dateString.getDate())} / {String(dateString.getMonth())}/ {String(dateString.getFullYear())}
                                </Text>
                            </TouchableOpacity>
                            <TextInput
                                style={[BaseStyle.textInput, { marginTop: 15, flex: 5, marginLeft: 10 }]}
                                onChangeText={text => setHeight(text)}
                                autoCorrect={false}
                                placeholder="ESTATURA (m)"
                                placeholderTextColor={
                                    idValidate
                                        ? BaseColor.grayColor
                                        : BaseColor.primaryColor
                                }
                                value={height}
                                keyboardType="numeric"
                                selectionColor={BaseColor.primaryColor}
                            />
                        </View>
                        <MapLocation />
                        <TouchableOpacity
                            style={styles.methodItem}
                            onPress={() => setIsVisible(true)}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginRight: 15
                                }}
                            >

                                <Text headline>{location}</Text>
                            </View>
                            <Icon
                                name="map-marker-alt"
                                size={18}
                                color={BaseColor.primaryColor}
                                style={{ marginLeft: 5 }}
                            />
                        </TouchableOpacity>
                        <Button
                            full
                            loading={loading}
                            style={{ marginTop: 20 }}
                            onPress={
                                pickValidate
                            }
                        >
                            Registrar
                        </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default AddPerson