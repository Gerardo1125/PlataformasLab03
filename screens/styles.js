import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export const CELL_SIZE = 55;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';


export default StyleSheet.create({
    contain: {
        alignItems: "center",
        padding: 20,
        width: "100%",
        paddingLeft: 30,
        paddingRight: 30
    },
    itemPick: {
        flex: 5,
        marginTop: 15,
        marginRight: 10,
        backgroundColor: BaseColor.fieldColor,
        width: '100%'
    },
    contentModal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    contentCalendar: {
        borderRadius: 8,
        width: "100%",
        backgroundColor: "white"
    },
    contentActionCalendar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15
    },
    methodItem: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1,
        paddingVertical: 15,
        marginTop: 10,
        marginBottom: 5
    },
})