import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Platform, Alert,TouchableWithoutFeedback,KeyboardAvoidingView,Keyboard } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddPostScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigation = useNavigation();

  const addPost = async () => {
    if (!title || !body) {
      Alert.alert('fill in all fields');
      return;
    }

    try {
      await axios.post('http://10.0.2.2:3000/users', { title, body });
      Alert.alert('Post added successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        style={styles.input}
        multiline
      />
      <Button title="Add Post" onPress={addPost} />
  
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 18,
  },
});

export default AddPostScreen;