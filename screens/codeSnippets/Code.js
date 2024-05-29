import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
    Clipboard
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { Button } from "react-native-paper";
  
  
  
  export default function Code({ route }) {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const { code_id } = route.params;
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
   
  
    useEffect(() => {
      axios
        .get(baseUrl + `/languages/codes/${code_id}/`)
        .then((response) => {
          setTopic(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tutorial post:", error);
          setLoading(false);
        });
    }, [code_id]);
  
    const copyCodeToClipboard = () => {
      Clipboard.setString(topic.code);
      alert("Code copied to clipboard!");
    };
  
    if (loading) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
  
    if (!topic) {
      return (
        <View style={styles.container}>
          <Text style={{ color: "white", textAlign: "center" }}>
            No data available
          </Text>
        </View>
      );
    }
  
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              {topic.title}
            </Text>
          </View>
  
          <ScrollView horizontal={true} style={styles.code}>
            <Text>{topic.code}</Text>
          </ScrollView>
  
          <TouchableOpacity
            onPress={copyCodeToClipboard}
            style={styles.copyButton}
          >
            <Button style={{ color: "black", backgroundColor: 'tomato', marginHorizontal: 30 }}>Copy Code</Button>
          </TouchableOpacity>
  
          <View style={styles.code}>
            <Text style={{ color: 'darkslategrey', fontWeight: 'bold', fontSize: 20, textAlign: 'center', margin: 10 }}>Code Explanation</Text>
            <Text>{topic.content}</Text>
          </View>
  
        
  
  
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    titleContainer: {
      margin: 10,
      backgroundColor: "darkslategrey",
      padding: 10,
      borderRadius: 10,
    },
    text: {
      backgroundColor: "darkslategrey",
      margin: 5,
      padding: 10,
      borderRadius: 12,
      color: "white",
      marginTop: 0,
    },
    code: {
      backgroundColor: "snow",
      margin: 10,
      padding: 20,
      borderRadius: 20,
    },
  });