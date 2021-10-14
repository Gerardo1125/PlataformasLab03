import React, { useState } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    TouchableOpacity,
    Image
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    StarRating,
    PostListItem,
    HelpBlock,
    Button,
    RoomType
} from "@components";
import * as Utils from "@utils";
import { InteractionManager } from "react-native";
import styles from "./styles";
import { useSelector, useDispatch } from 'react-redux';


const PersonView = props => {
    let TouchableCmp = TouchableOpacity;
    return (

        <TouchableCmp
            style={[styles.item, props.style]}
            //onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.contain}>
                <Image style={[styles.thumb, props.imageStyle]} source={{ uri: props.image }} />
                <View style={styles.content, styles.left}>
                    <Text headline semibold>
                        {props.name + " " + props.lastName}
                    </Text>
                    <Text
                        note
                        numberOfLines={1}
                        footnote
                        grayColor
                        style={{
                            paddingTop: 5
                        }}
                    >
                        DNI: {props.dni}
                    </Text>
                    <Text
                        note
                        numberOfLines={1}
                        footnote
                        grayColor
                        style={{
                            paddingTop: 5
                        }}
                    >
                        Telefono: {props.number}
                    </Text>
                    <Text
                        note
                        numberOfLines={1}
                        footnote
                        grayColor
                        style={{
                            paddingTop: 5
                        }}
                    >
                        Fecha: {props.date}
                    </Text>
                    <Text
                        note
                        numberOfLines={1}
                        footnote
                        grayColor
                        style={{
                            paddingTop: 5
                        }}
                    >
                        Estatura: {props.heigth}
                    </Text>
                    <Text
                        note
                        numberOfLines={1}
                        footnote
                        grayColor
                        style={{
                            paddingTop: 5
                        }}
                    >
                        {props.location}
                    </Text>
                </View>
                <View style={styles.right}>
                    <Icon
                        name="edit"
                        color={BaseColor.primaryColor}
                        size={30}
                        solid
                        style={{ marginRight: 10 }}
                    />
                </View>
            </View>
        </TouchableCmp>




    )
}

export default PersonView