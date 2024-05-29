import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { RichEditor, RichToolbar, actions } from 'react-native-rich-editor';

const AddBlog = ({ navigation }) => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const richText = React.createRef();

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('Please fill in both fields');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/blogs/`, {
        title: title,
        content: content,
      });
      alert('Blog created successfully');
      // Navigate to the blog list or the newly created blog
      navigation.navigate('YourBlogs');
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog');
    }
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter blog title"
      />
      <Text style={styles.label}>Content</Text>
      <RichEditor
        ref={richText}
        style={styles.richEditor}
        placeholder="Enter blog content"
        onChange={setContent}
      />
      <RichToolbar style={{ marginTop: 10 }}
        editor={richText}

        // Connect the RichToolbar  
        // to the RichEditor 
        actions={[actions.setBold,
        actions.insertBulletsList,
        actions.insertOrderedList,
        actions.insertLink,
        actions.setStrikethrough,
        actions.setItalic,
        actions.setUnderline,
        actions.heading1,]}

        // Define available text  
        // formatting actions 
        iconMap={{ [actions.heading1]: handleHead, }} />

      <Button title="Create Blog" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  richEditor: {
    flex: 1,
    minHeight: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default AddBlog;
