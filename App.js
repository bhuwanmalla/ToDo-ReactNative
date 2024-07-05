import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Keyboard } from 'react-native';
import Task from './components/Task';
import db from './firebase';
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const dbCollection = collection(db, 'Todo');

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(dbCollection);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        status: doc.data().status
      }));
      setTaskItems(data);
    };
    fetchData();
  }, []);

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      Keyboard.dismiss();
      const newTask = { title: task, status: false };
      const docRef = await addDoc(dbCollection, newTask);
      setTaskItems([...taskItems, { id: docRef.id, ...newTask }]);
      setTask('');
    };
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'Todo', taskId));
      setTaskItems(taskItems.filter(task => task.id !== taskId));
    } catch (error) {
      console.log('Error while deleting task: ', error);
    }
  }

  const handleToggleTaskStatus = async (taskId) => {
    const taskToUpdate = taskItems.find(task => task.id === taskId);
    const updatedTask = { ...taskToUpdate, status: !taskToUpdate.status };
    try {
      await updateDoc(doc(db, 'Todo', taskId), { status: updatedTask.status });
      setTaskItems(
        taskItems.map(task =>
          task.id === taskId ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('Error on changing status: ', error);
    }
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
