import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditPostScreen = () => {
  const route = useRoute();
  const { post } = route.params as { post: { id: number, title: string, body: string } };
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const navigation = useNavigation();

  const editPost = async () => {
    if (!title || !body) {
      Alert.alert('Please fill in all fields');
      return;
    }

    try {
      await axios.put(`http://10.0.2.2:3000/users/${post.id}`, { title, body });
      Alert.alert('Post updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <View style={styles.container}>
    <TextInput
      placeholder="Title"
      value={title}
      onChangeText={setTitle}
      style={styles.input}
    />
    <TextInput
      placeholder="Body"
      value={body}
      onChangeText={setBody}
      style={[styles.input, styles.textArea]}
      multiline
    />

    
      <Button title="Update Post" onPress={editPost} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'center', // Centers content vertically
    backgroundColor: '#DAE0E2',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 30,  // Adjusts the margin at the bottom of the screen
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5, // Adds shadow for Android
    textAlign:'center'

  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#F3B431',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#EAF0F1',
    fontSize: 16,
    textAlign:'center'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',  // Ensures text starts at the top of the textarea
 

},

buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#7B8788',
    paddingVertical: 10,
    padding:20,
    borderRadius: 6,
    alignItems: 'center',

  },
});
export default EditPostScreen;
