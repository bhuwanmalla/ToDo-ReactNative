import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Button } from 'react-native';
import styles from './styles'


const Task = ({ task, deleteTask, toggleTaskStatus }) => {
    const [taskDone, setTaskDone] = useState(false);


    return (
        <View style={styles.container}>
            <View style={styles.upperItem}>
                <Text style={styles.task}>{task.title}</Text>
                <Switch value={task.status}
                    onValueChange={() => toggleTaskStatus(task.id)}
                />
            </View>
            <View style={styles.taskContainer}>
                <Text style={styles.taskTitle}> {task.status ? 'Done' : 'Due'}</Text>
                <TouchableOpacity onPress={() => deleteTask(task.id)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Task;
