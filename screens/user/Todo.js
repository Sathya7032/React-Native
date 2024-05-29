import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { decode as base64Decode } from 'base-64';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import useAxios from '../../utils/UseAxios';
import { Divider } from 'react-native-paper';

const Todo = () => {
  const baseUrl = 'https://acadamicfolios.pythonanywhere.com/app';
  const { authTokens } = useContext(AuthContext);

  const decodeJWT = (token) => {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error("Invalid JWT token");
    }
    const base64UrlPayload = tokenParts[1];

    const base64UrlDecode = (base64Url) => {
      base64Url = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const pad = base64Url.length % 4;
      if (pad) {
        if (pad === 1) {
          throw new Error("Invalid base64 string");
        }
        base64Url += new Array(5 - pad).join('=');
      }
      return base64Decode(base64Url);
    }

    const jsonPayload = base64UrlDecode(base64UrlPayload);
    return JSON.parse(jsonPayload);
  }


  const decodedToken = decodeJWT(authTokens.access);
  const user_id = decodedToken.user_id;

  const [todo, setTodo] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${baseUrl}/todo/${user_id}/`);
      setTodo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [createTodo, setCreateTodo] = useState({ title: '', completed: '' });
  const handleNewTodoTitle = (text) => {
    setCreateTodo({
      ...createTodo,
      title: text,
    });
  };

  const formSubmit = async () => {
    try {
      const res = await axios.post(`${baseUrl}/todo/${user_id}/`, {
        user: user_id,
        title: createTodo.title,
        completed: false,
      });
      Alert.alert('Success', 'Your Task is Added.');
      fetchTodos();
      setCreateTodo({ title: '' });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        Alert.alert('Error', error.response.data.detail || 'Failed to add task. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        Alert.alert('Error', 'No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    }
  };


  const deleteTodo = async (todo_id) => {
    try {
      await axios.delete(`${baseUrl}/todo-detail/${user_id}/${todo_id}/`);
      Alert.alert('Your Task is deleted......');
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const markTodoAsComplete = async (todo_id) => {
    try {
      await axios.patch(`${baseUrl}/todo-mark-as-completed/${user_id}/${todo_id}/`);
      Alert.alert('Your Task is completed.....');
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo List</Text>
      </View>
      <View style={styles.inputContainer}>


        <TextInput
          style={styles.input}
          onChangeText={handleNewTodoTitle}
          value={createTodo.title}
          placeholder="Add new task"
        />
        <Button title="Add" onPress={formSubmit} />
      </View>
      {todo.map((todo) => (
        <>
        <View style={styles.todoItem} key={todo.id}>
            
            {todo.completed ?(
              <Text style={styles.todoText1}>{todo.title}</Text>
            ):(
              <Text style={styles.todoText}>{todo.title}</Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'green', marginHorizontal: 5, padding: 8, borderRadius: 12 }]} onPress={() => markTodoAsComplete(todo.id)}>
                <MaterialIcons name="done" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: 'red', marginHorizontal: 5, padding: 8, borderRadius: 12 }]} onPress={() => deleteTodo(todo.id)}>
                <MaterialIcons name="delete" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Divider />
        </>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
  },
  todoText1: {
    flex: 1,
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default Todo;
