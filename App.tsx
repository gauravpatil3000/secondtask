import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostsScreen from './screen/PostScreen';
import AddPostScreen from './screen/AddPostScreen';
import EditPostScreen from './screen/EditPostScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen name="Posts" component={PostsScreen} options={{ title: 'Posts' }} />
        <Stack.Screen name="AddPost" component={AddPostScreen} options={{ title: 'Add Post' }} />
        <Stack.Screen name="EditPost" component={EditPostScreen} options={{ title: 'Edit Post' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
