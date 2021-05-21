import React,{useState} from 'react';
import { Text, Image,Alert, ToastAndroid, TouchableOpacity, StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogInScreen = ({navigation}) => {
    const [adminUserName, setAdminUserName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const [userName, setUserName] = useState('');
    const [userPass, setUserPass] = useState('');

    const sendAdminCredentials = async () => {
        fetch("https://arcane-escarpment-80078.herokuapp.com/signin",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "email":userName,
                "password":userPass
            })
        })
        .then(res => res.json())
        .then(async (data) => {
            console.log(data);
            try {
                await AsyncStorage.setItem('adminToken', data.token);
                navigation.replace('Admin');
            } catch (e) {
                console.log("Error-",e);
                Alert.alert('Please enter correct user name and Password.');
            }   
        })
        .catch(err => {
            console.error(err);
        })
    }

    const sendCredentials = async () => {
        fetch("https://arcane-escarpment-80078.herokuapp.com/signin",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "email":userName,
                "password":userPass
            })
        })
        .then(res => res.json())
        .then(async (data) => {
            console.log(data);
            try {
                await AsyncStorage.setItem('token', data.token);
                navigation.replace('Home');
            } catch (e) {
                console.log("Error-",e);
                Alert.alert('Please enter correct user name and Password.');
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
                onChangeText={(value) => {
                    setAdminUserName(value);
                    setUserName(value);
                } }
            />

            <TextInput 
                label="Password"
                mode="outlined"
                theme={{colors:{primary:"blue"}}}
                style={styles.textInput}
                secureTextEntry
                value={userPass}
                onChangeText={(value) => {
                    setAdminPassword(value);
                    setUserPass(value)
                }} 
            />
            
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => {
                    ToastAndroid.show("Please wait.", ToastAndroid.LONG);
                    if(adminUserName === 'admin@1234' && adminPassword === '8/8/8'){
                        return sendAdminCredentials();
                    }
                    sendCredentials();
                }}
            >
                Log In
            </Button>

            <TouchableOpacity
                style={styles.textStyle}
                onPress={() => navigation.replace('SignUp')}
            >

                <Text>Don't have an account? Sign up.</Text>

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#d6eaf8',
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
        marginTop:10,
        alignSelf:'center',
        marginBottom:60
    }
});



export default LogInScreen;