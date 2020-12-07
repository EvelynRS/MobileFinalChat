import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Chat from './components/Chat';
import Login from './components/Login';
import Signup from './components/Signup';
import Users from './components/Users';

const ChatStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <ChatStack.Navigator>
        <ChatStack.Screen name="Login" component={Login} />
        <ChatStack.Screen name="Signup" component={Signup} />
        <ChatStack.Screen name="Chat" component={Chat} />
        <ChatStack.Screen name="Users" component={Users} />
      </ChatStack.Navigator>
    </NavigationContainer>
  );
}

export default App;