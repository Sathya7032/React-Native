import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CodeList({ route, navigation }) {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

  const { id } = route.params;

  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios
      .get(baseUrl + `/languages/${id}/codes/`)
      .then((response) => {
        setCodes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tutorials:", error);
      });
      setLoading(false)
  }, [id]);

  const navigateToCode = (code_id) => {
    navigation.navigate("Code", { code_id: code_id });
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
        List of Codes
      </Text>
      {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
      codes.map((code, index) => (
        <TouchableOpacity
        onPress={() => navigateToCode(code.code_id)}
         >
          <View key={code.code_id}  style={styles.container}>
            <Text style={{ color: "white" }}>{index+1}. {code.title}</Text>
          </View>
        </TouchableOpacity>
      ))
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    backgroundColor: "darkslategray",
    margin: 10,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
});