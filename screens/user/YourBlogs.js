import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert, StyleSheet, ActivityIndicator } from "react-native";
import AuthContext from "../../context/AuthContext";
import { Avatar, Card, Divider, IconButton } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { decode as base64Decode } from 'base-64';
import axios from "axios";
import HTML from "react-native-render-html";
import { MaterialIcons } from '@expo/vector-icons';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

const YourBlogs = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const { authTokens } = useContext(AuthContext); // Access tokens and user from context

  const [loading, setLoading] = useState(true);
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
  const [blog, setBlog] = useState([]);

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${baseUrl}/blog/${user_id}/`);
      setBlog(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (blog_id) => {
    try {
      await axios.delete(`${baseUrl}/blog/${user_id}/${blog_id}/`);
      Alert.alert("Blog Deleted", "Blog deleted successfully", [{ text: "OK" }]);
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        blog.map((blo) => (
          <View key={blo.id}>
            <Card style={styles.card}>
              <View style={styles.container}>
                <Text style={styles.date}>{formatDate(blo.date)}</Text>
                <TouchableOpacity style={styles.button} onPress={deleteBlog}>
                  <MaterialIcons name="delete" size={24} color="white" />
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
              <Divider />
              <Card.Content>
                <Text style={styles.title}>{blo.title}</Text>
                <HTML
                  source={{ html: blo.content }}
                  contentWidth={300}
                />
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon={() => <Ionicons name="heart-outline" size={24} color="black" />}
                  onPress={() => { }}
                />
                <IconButton
                  icon={() => <Ionicons name="share-social-outline" size={24} color="black" />}
                  onPress={() => { }}
                />
              </Card.Actions>
            </Card>
            <Divider/>
          </View>
        ))
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: 'darkslategrey',
    textAlign:'center',
  },
  content: {
    fontSize: 14,
    color: "gray",
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items along the main axis (horizontally)
    marginBottom: 10, // Optional spacing between each row
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
});

export default YourBlogs;
