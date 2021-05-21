import React,{useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = ({navigation}) => {

    const detectLogin = async ()=>{
      const token = await AsyncStorage.getItem('token');
      const adminToken = await AsyncStorage.getItem('adminToken');
      if(adminToken){
         navigation.replace('Admin');
      }
      else if(token){ 
        navigation.replace('Home');
      }else{
         navigation.replace('LogIn');
      }
    }
    
    useEffect(()=>{
     detectLogin()
    },[])

    return (
        <View style={styles.container}>

            <ActivityIndicator 
                size="large"
                color="blue"
            />

        </View>
    );
};
    
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

LoadingScreen.navigationOptions = () => {
    return {
        
    }
}

export default LoadingScreen;