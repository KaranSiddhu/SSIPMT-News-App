import React,{useState} from 'react';
import { Text, Image, TouchableOpacity, ToastAndroid, Alert, StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignUpScreen = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const sendcredentials = async () => {
        fetch("https://arcane-escarpment-80078.herokuapp.com/signup",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({
                "email":userName,
                "password":password
            })
        })
        .then(res => res.json())
        .then(async (data) => {
            console.log(data);
            try {
                await AsyncStorage.setItem('token', data.token);
                navigation.replace('Home');
              } catch (e) {
                Alert.alert('This username is already taken.');
              }
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <View style={styles.container}>
            
            <Image 
                source={require('./ssipmt.png')}
                style={styles.logo}
            />


            <TextInput 
                label="User name"
                mode="outlined"
                theme={{colors:{primary:"blue"}}}
                style={styles.textInput}
                autoCapitalize='none'
                value={userName}
                onChangeText={(value) => setUserName(value)}
            />

            <TextInput 
                label="Password"
                mode="outlined"
                theme={{colors:{primary:"blue"}}}
                style={styles.textInput}
                secureTextEntry
                value={password} 
                onChangeText={(value) => setPassword(value)}
            />
            
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => {
                    ToastAndroid.show("Please wait.", ToastAndroid.LONG);
                    sendcredentials();
                }}
            >
                Sign Up
            </Button>

            <TouchableOpacity
                style={styles.textStyle}
                onPress={() => navigation.replace('LogIn')}
            >

                <Text>Already have an account? Log In.</Text>

            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',

        backgroundColor:'#d6eaf8'
    },

    logo:{
        width:215,
        height:190,
        alignSelf:'center',
    },


    textInput:{
        margin:10,
        backgroundColor:'#ebf5fb'
    },

    button:{
        marginHorizontal:55,
        marginVertical:7,
        backgroundColor:'#1A5276'
    },
    textStyle:{
        alignSelf:'center',
        marginBottom:60,
        marginTop:10,

    }
});


export default SignUpScreen;