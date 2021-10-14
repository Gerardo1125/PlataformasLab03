import React from "react"

import { View, FlatList } from "react-native"
import PersonView from "./components/PersonView"
import { useSelector, useDispatch } from 'react-redux';
import {Header, Text } from "@components";

const ShowPerson = props => {

    const { bookmarks } = useSelector(state => state.userReducer);
    console.log(bookmarks)
    return (
        <View style={{ flex: 1 }}>
            <Header
                title="Personal Registrado"

            />
            {
                bookmarks.length === 0 ?
                    <Text>AUN NO HAY NADA</Text>
                    : <FlatList
                        /*refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={
                                    () => {

                                        setRefresh(true);
                                        setTimeout(() => {
                                            setRefresh(false);
                                            all();
                                        }, 1500);
                                    }
                                }
                            />
                        }*/
                        data={bookmarks}
                        keyExtractor={item => item.date}
                        renderItem={
                            itemData =>
                                <PersonView
                                    name={itemData.item.name}
                                    lastName={itemData.item.lastName}
                                    dni={itemData.item.dni}
                                    number={itemData.item.number}
                                    date={itemData.item.date}
                                    heigth={itemData.item.heigth}
                                    location={itemData.item.location}
                                    image={itemData.item.image}

                                />
                        }
                    />
            }
        </View>
    )
}

export default ShowPerson