import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TextInput, Button } from "react-native";
import axios from "axios";
import YoutubePlayer from "react-native-youtube-iframe";
import HTML from "react-native-render-html";
import { Divider } from "react-native-paper";
import { decode as base64Decode } from 'base-64';
import useAxios from '../utils/UseAxios';
import AuthContext from "../context/AuthContext";

export default function TopicView({ route }) {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const { post_id } = route.params;
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const { authTokens } = useContext(AuthContext);

  // Decode JWT token to get user ID
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

  const decodedToken = authTokens ? decodeJWT(authTokens.access) : null;
  const user_id = decodedToken ? decodedToken.user_id : null;

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tutorials/posts/${post_id}/`);
        setTopic(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutorial post:", error);
        setLoading(false);
      }
    };
    fetchTopic();
  }, [post_id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tutorials/${post_id}/comments/`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [post_id]);

  const api = useAxios();

  const handleSubmit = async () => {
    if (!authTokens) {
      console.error("User is not logged in");
      return;
    }

    try {
      const response = await api.post(`${baseUrl}/tutorials/${post_id}/comment/create/`, {
        content: content,
        user: user_id,
      }, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      });
      console.log("Comment posted successfully:", response.data);
      setContent(""); // Reset form field after successful submission
      setComments([...comments, response.data]); // Update comments state
    } catch (error) {
      console.error("Error posting comment:", error);
    }
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
        <Text style={styles.text}>No data available</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{topic.post_title}</Text>
        </View>
        <View style={styles.playerContainer}>
          <YoutubePlayer height={300} play={true} videoId={topic.post_file} />
          <Divider />
        </View>
        <View style={styles.textcontainer}>
          <HTML source={{ html: topic.post_content }} contentWidth={300} />
          <Divider />
          <View style={styles.commentContainer}>
            <Text style={styles.heading1}>Add comment</Text>
            {authTokens ? (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={text => setContent(text)}
                  value={content}
                  placeholder="Add comment"
                  multiline={true}
                  numberOfLines={4}
                />
                <Button title="Add" onPress={handleSubmit} />
              </>
            ) : (
              <Text>Please Login</Text>
            )}
          </View>
          <Divider />
        </View>
        <View style={styles.comments}>
          <Text style={styles.heading1}>Comments</Text>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentSection}>
              <Text>{comment.content}</Text>
              <Divider />
              <Text style={styles.text1}>Comment by: {comment.user.username}</Text>
            </View>
          ))}
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
    backgroundColor: 'darkslategrey',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    margin: 5,
    padding: 10,
    color: "white",
  },
  text1: {
    margin: 5,
    padding: 10,
    color: "tomato",
  },
  textcontainer: {
    padding: 12,
  },
  comments: {
    marginTop: 10,
  },
  commentSection: {
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 8,
    padding: 12,
    margin: 20,
  },
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  commentContainer: {
    marginHorizontal: 10,
    margin: 20,
  },
  heading1: {
    color: 'tomato',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
