import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, ActivityIndicator, Text, StyleSheet} from 'react-native';


const HomeScreen = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {

        fetch('https://arcane-escarpment-80078.herokuapp.com/news')
            .then(res => res.json())
            .then(news => setData(news))
            .catch(err => console.error(err))
            .finally(setLoading(false));

    }, []);

    
    return (
        <View style={styles.container}>
                                
            {isLoading ? <ActivityIndicator /> :
                <FlatList 
                    data = {data}
                    keyExtractor={(id) => id._id}
                    showsVerticalScrollIndicator = {false}
                    renderItem={ ({item}) => {
                        return (
                            <View style={styles.cards}>

                                <Text style={styles.title}>{item.title} </Text>

                                <Text style={styles.description}>{item.description}</Text>

                                <Text style={styles.date}>{item.date}</Text>

                            </View>
                        );
                    }}
                />
            }
            
        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#78fdff'
    },
    title:{
        fontSize:26,
        color:'#002c69',
        fontWeight:'bold',
        marginBottom:10,
        paddingLeft:10
    },
    description:{
        fontSize:18,
        paddingLeft:10
    },
    cards:{
        borderColor: '#3644a1',
        borderWidth:3,
        marginHorizontal:7,
        marginVertical:5,
        borderRadius:12,
        padding:8,
        backgroundColor:'#ffffff'
    },
    date:{
        alignSelf:'flex-end'
    }

});

export default HomeScreen;