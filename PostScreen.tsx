import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/users');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (postId: number) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/users/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
      Alert.alert('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('EditPost', { post: item })} />
            <Button title="Delete" onPress={() => deletePost(item.id)} />
          </View>
        )}
      />
      <Button title="Add Post" onPress={() => navigation.navigate('AddPost')} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  postContainer: {
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
export default PostsScreen;