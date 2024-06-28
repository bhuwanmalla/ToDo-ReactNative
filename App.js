import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      Keyboard.dismiss();
      setTaskItems([...taskItems, { id: Date.now().toString(), title: task, status: false }]);
      setTask('');
    }
  }

  const handleDeleteTask = (taskId) => {
    setTaskItems(taskItems.filter(task => task.id !== taskId));
  }

  const handleToggleTaskStatus = (taskId) => {
    setTaskItems(
      taskItems.map(task =>
        task.id === taskId ? { ...task, status: !task.status } : task
      )
    );
  };

  return (

    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> ToDo Tasks </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add your task'
          value={task}
          onChangeText={text => setTask(text)}
        />
        <Button
          title='Add Task'
          onPress={handleAddTask}
          disabled={task.trim() === ''}
        />
      </View>

      <ScrollView style={styles.taskItems}>
        {taskItems.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={handleDeleteTask}
            toggleTaskStatus={handleToggleTaskStatus}
          />
        ))}
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingTop: 60,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskItems: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
  },
});
