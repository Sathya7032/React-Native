import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import useAxios from "../../utils/UseAxios";
import AuthContext from "../../context/AuthContext";
import { decode as base64Decode } from 'base-64';
import axios from "axios";

const Dashboard = ({ navigation }) => {
  const { authTokens } = useContext(AuthContext); // Access tokens and user from context
  const api = useAxios();
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const [todo, setTodo] = useState({});
  const [blog, setBlog] = useState([]);

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
  const userId = decodedToken.user_id; // Use the correct key as per your JWT payload structure
  const username = decodedToken.username; // Use the correct key as per your JWT payload structure

  useEffect(() => {
    fetchTodos(userId);
    fetchBlogs(userId);
  }, [userId]);

  const fetchTodos = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/todos/${userId}/summary/`);
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const fetchBlogs = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/blog/${userId}/`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };



  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <View style={styles.gridContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.welcomeText}>Welcome {username}</Text>
            <Text style={styles.description}>
              "Welcome to AcademicFolio, your all-in-one destination for academic excellence and social connectivity..."
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Tasks</Text>
            <Text style={styles.cardCount}>{todo.total_tasks}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Active</Text>
            <Text style={styles.cardCount}>{todo.active_tasks}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Done</Text>
            <Text style={styles.cardCount}>{todo.completed_tasks}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Your Blogs</Text>
          {blog.map((blogs) => (
            <View key={blogs.id} style={styles.blogItem}>
              <TouchableOpacity onPress={() => {/* navigate to your_blogs */ }}>
                <Text style={styles.blogTitle}>{blogs.title}</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
            </View>
          ))}
        </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginVertical: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "brown",
    textAlign: "center",
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardCount: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  blogItem: {
    marginVertical: 5,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
});

export default Dashboard;
