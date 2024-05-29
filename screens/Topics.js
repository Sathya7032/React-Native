import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Topics({ route, navigation }) {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

  const { tutId } = route.params;

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + `/tutorials/${tutId}/posts`)
      .then((response) => {
        setTopics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tutorials:", error);
      });
  }, [tutId]);

  const navigateToSingleBlog = (post_id) => {
    navigation.navigate("topic", { post_id: post_id });
  };


  return (
    <ScrollView>
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          fontWeight: "bold",
          margin: 15,
        }}
      >
        Tutorial Topics
      </Text>
      {topics.map((topic) => (
        <TouchableOpacity
         
          onPress={() => navigateToSingleBlog(topic.post_id)}
        >
          <View key={topic.post_id}  style={styles.container}>
            <Text style={{ color: "white" }}>{topic.post_title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    backgroundColor: "#233142",
    margin: 10,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
});