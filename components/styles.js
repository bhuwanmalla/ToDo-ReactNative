import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F7F8',
        borderRadius: 10,
        marginBottom: 10,
    },

    task: {
        padding: 10,
    },

    upperItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    taskContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
    },
    taskTitle: {
        flex: 1,
    },
    deleteButton: {
        color: 'red',
    },
})

export default styles