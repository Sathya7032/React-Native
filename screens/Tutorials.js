import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Divider } from "react-native-paper";

export default function Tutorials({ navigation }) {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true)
    await axios.get(baseUrl + "/tutorials/").then((res) => {
      setTutorials(res.data);
    });
    setLoading(false)
  };

  const navigateToSingleBlog = (tutId) => {
    navigation.navigate("topics", { tutId: tutId });
  };

  return (
    <ScrollView>
      <Text style={styles.heading}>Tutorials</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        tutorials.map((tut) => (
          <TouchableOpacity onPress={() => navigateToSingleBlog(tut.id)}>
            <View style={styles.container}>
              <Image source={{ uri: tut.tutorialImage }} style={styles.image} />
              <Text style={styles.text}>{tut.tutorialName}</Text>
              <Divider />
              <Text style={styles.text1}>{tut.tutorialContent}</Text>
            </View>
            <Divider/>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'snow',
    margin: 10,
    borderColor:'black',
    borderRadius: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 19,
    color: 'darkslategrey',
  },
  image: {
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 0
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight:'bold',
    color: 'tomato',
    padding: 15,
  },
  text1: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',

  }
});