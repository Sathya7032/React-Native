import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Button, TextInput } from "react-native";
import axios from "axios";
import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-paper";
import AuthContext from "../context/AuthContext";
import { decode as base64Decode } from 'base-64';
import useAxios from "../utils/UseAxios";

const BlogScreen = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [comments, setComments] = useState({});
  const [content, setContent] = useState("");
  const navigation = useNavigation();

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
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/blogs/?page=${currentPage}`);
      const fetchedBlogs = response.data.results;
      setBlogs(fetchedBlogs);
      setTotalPages(Math.ceil(response.data.count / response.data.results.length));
      fetchAllComments(fetchedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  const fetchAllComments = async (blogs) => {
    const commentsData = {};
    for (const blog of blogs) {
      try {
        const response = await axios.get(`${baseUrl}/blogs/${blog.id}/comments/`);
        commentsData[blog.id] = response.data;
      } catch (error) {
        console.error(`Error fetching comments for blog ${blog.id}:`, error);
        commentsData[blog.id] = [];
      }
    }
    setComments(commentsData);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const api = useAxios();

  const handleSubmit = async () => {
    if (!authTokens) {
      console.error("User is not logged in");
      return;
    }

    try {
      const response = await api.post(`${baseUrl}/tutorials/${blogId}/comment/create/`, {
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


  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          blogs.map((blog) => (
            <View key={blog.id} style={styles.blogItem}>
              <View style={styles.blogContent}>
                <Text style={styles.blogTitle}>{blog.title}</Text>
                <Divider />
                <HTML
                  source={{ html: blog.content }}
                  contentWidth={300}
                />
                <Text style={styles.blogViews}>
                  Views: <Text style={styles.viewsCount}>{blog.views}</Text>
                </Text>
                <Divider />
                <View style={styles.textcontainer}>
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
                      <Text>Please Login to add a comment</Text>
                    )}
                  </View>
                  <Divider />
                </View>

                <View style={styles.commentsSection}>
                  <Text style={styles.commentsTitle}>Comments:</Text>
                  {comments[blog.id] ? (
                    comments[blog.id].map((comment, index) => (
                      <View key={index} style={styles.commentItem}>
                        <Text style={{ fontWeight: 'bold' }}>{comment.content}</Text>
                        <Text style={styles.commentAuthor}>Comment by :- {comment.user.username}</Text>
                        <Divider />
                      </View>
                    ))
                  ) : (
                    <Text>No comments available</Text>
                  )}
                </View>
              </View>
            </View>
          ))
        )}

        <View style={styles.pagination}>
          <Button
            title="Previous"
            onPress={handlePreviousPage}
            disabled={currentPage === 1}
          />
          <Text style={styles.pageIndicator}>{currentPage} / {totalPages}</Text>
          <Button
            title="Next"
            onPress={handleNextPage}
            disabled={currentPage === totalPages}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000"
  },
  container: {
    padding: 10
  },
  blogItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    borderColor: "#000",
    borderWidth: 1,
  },
  blogImage: {
    width: "100%",
    height: 200
  },
  blogContent: {
    padding: 15
  },
  blogDate: {
    color: "#6c757d",
    marginBottom: 10
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
    color: 'tomato'
  },
  blogViews: {
    marginTop: 10,
    color: "tomato",
  },
  viewsCount: {
    color: "black"
  },
  readMoreButton: {
    marginTop: 10,
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center"
  },
  readMoreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20
  },
  pageIndicator: {
    fontSize: 16,
    fontWeight: "bold"
  },
  commentsSection: {
    marginTop: 10,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: 'center'
  },
  commentItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 2
  },
  commentAuthor: {
    marginTop: 5,
    fontStyle: "italic",
    color: "#555",
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

export default BlogScreen;
