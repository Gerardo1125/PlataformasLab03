import React from 'react';
import { Icon } from "@components";
import { BaseColor, BaseStyle } from "@config";

import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import AddPerson from '../screens/AddPerson';
import ShowPerson from '../screens/ShowPersons';

const bottomTabNavigatorConfig = {
    initialRouteName: "AddPerson",
    tabBarOptions: {
        showIcon: true,
        showLabel: true,
        activeTintColor: BaseColor.primaryColor,
        inactiveTintColor: BaseColor.grayColor,
        style: BaseStyle.tabBar,
        labelStyle: {
            fontSize: 12
        }
    }
};

const routeConfigs = {
    AddPerson: {
        screen: AddPerson,
        navigationOptions: ({ navigation }) => ({
            title: "AddPerson",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon color={tintColor} name="copy" size={20} solid />;
            }
        })
    },
    ShowPerson: {
        screen: ShowPerson,
        navigationOptions: ({ navigation }) => ({
            title: "ShowPerson",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon color={tintColor} name="user-circle" size={20} solid />;
            }
        })
    }
}
const BottomTabNavigator = createBottomTabNavigator(
    routeConfigs,
    bottomTabNavigatorConfig
);

const HomeStack = createStackNavigator({
    BottomTabNavigator: BottomTabNavigator
},{
    headerMode: "none",
    initialRouteName: 'BottomTabNavigator',
})

export default HomeStack

