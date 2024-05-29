import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

export default function Codes({ navigation }) {
  const [lang, setLang] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://acadamicfolios.pythonanywhere.com/app/languages/"
        );
        setLang(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const navigateToTopics = (langId) => {
    navigation.navigate("CodeTopic", { langId: langId });
  };
  return (
    <ScrollView>
      <Text style={styles.text3}>Programing codes</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        lang.map((lan) => (
          <TouchableOpacity onPress={() => navigateToTopics(lan.id)}>
          <View key={lang.id} style={styles.container1}>
            <View style={styles.textContainer1}>
              <Text style={styles.text1}>{lan.language}</Text>

              <View
                style={{ marginHorizontal: 40, borderRadius: 40, marginTop: 10 }}
              >
              </View>
            </View>
          </View>
          </TouchableOpacity>
        ))
      )}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 200,
    margin: 10,
  },
  roundedImage: {
    borderRadius: 10, // Adjust the value as needed for the desired roundness
  },
  textContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background to make text readable
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
 
 
  container1: {
    flexDirection: "row", // Arrange children horizontally
    alignItems: "center", // Center children vertically
    backgroundColor: "#233142",
    padding: 10,
    borderWidth: 1,
    margin: 20,
    borderColor: "white",
    borderRadius: 20,
  },
  
  textContainer1: {
    flex: 1, // Take remaining space
    marginLeft: 10,
  },
  text1: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    textTransform:'uppercase',
    color:'white',
  },

  text3: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    color: "green",
  },

  container2: {
    flexDirection: "row", // Align children horizontally
    justifyContent: "space-between", // Evenly space children along the main axis
    alignItems: "center", // Center children vertically
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  item: {
    alignItems: "center", // Center children horizontally
    backgroundColor: "snow",
    width: 80,
    padding: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  item1: {
    alignItems: "center", // Center children horizontally
    backgroundColor: "snow",
    width: 150,
    padding: 5,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
  },

  item2: {
    alignItems: "center", // Center children horizontally
    width: 150,
    padding: 5,
    marginTop: 40,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
  },

  images1: {
    width: 150,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 0,
    paddingTop: 0,
  },
  container3: {
    backgroundColor: "snow",
    marginTop: 20,

    margin: 1,
    borderRadius: 20,
  },
});