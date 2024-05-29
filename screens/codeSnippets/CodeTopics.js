import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CodeTopics({ route, navigation }) {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

    const { langId } = route.params;

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        axios
            .get(baseUrl + `/languages/${langId}/topics/`)
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tutorials:", error);
            });
        setLoading(false)
    }, [langId]);

    const navigateToCodes = (id) => {
        navigation.navigate("CodeList", { id: id });
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
                Code Topics
            </Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                topics.map((topic, index) => (
                    <TouchableOpacity
                        onPress={() => navigateToCodes(topic.id)}
                    >
                        <View key={topic.id} style={styles.container}>
                            <Text style={{ color: "white" }}>{index + 1}. {topic.topic}</Text>
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