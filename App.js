import React from 'react';
import {TouchableOpacity} from 'react-native';

import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import LogInScreen from './src/screens/Auth/LogInScreen';
import AdminHomeScreen from './src/screens/Admin/AdminHomeScreen';
import SignUpScreen from './src/screens/Auth/SignUpScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SimpleLineIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>

    <Stack.Navigator>

        <Stack.Screen name="loading" component={LoadingScreen} options={{headerShown: false}} />
        
        <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={({navigation}) => ({ 
          headerRight: () => {
           return (
            <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.removeItem('token')
                  navigation.replace('LogIn');
                  console.log("removed");
                }}
            >

              <SimpleLineIcons name="logout" style={{marginEnd:10}} size={24} color="black" />
                
            </TouchableOpacity>
          )}
         })}
        />

        <Stack.Screen name="SignUp" component={SignUpScreen} />
        
        <Stack.Screen name="LogIn" component={LogInScreen} />
        
        <Stack.Screen 
          name="Admin" 
          component={AdminHomeScreen}  
          options={({navigation}) => ({ 
            headerRight: () => {
            return (
              <TouchableOpacity
                  onPress={async () => {
                    await AsyncStorage.removeItem('adminToken')
                    navigation.replace('LogIn');
                    console.log("removed");
                  }}
              >

                <SimpleLineIcons name="logout" style={{marginEnd:10}} size={24} color="black" />
                  
              </TouchableOpacity>
            )}
            
          })}
        />
          
    </Stack.Navigator>
  
  </NavigationContainer>
  );
}

export default App;