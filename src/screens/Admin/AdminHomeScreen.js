import React, {useState, useEffect} from 'react';
import { 
    ToastAndroid,
    TouchableOpacity,
    FlatList, 
    Modal,
    ActivityIndicator, 
    Text, 
    View, 
    StyleSheet, 
    Alert,
    Image
} 
from 'react-native';

import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const AdminHomeScreen = ({navigation}) => {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {

        fetch('https://arcane-escarpment-80078.herokuapp.com/news')
            .then(res => res.json())
            .then(news => setData(news))
            .catch(err => console.error(err))
            .finally(setLoading(false));

    }, []);

    const sendContent = () => {
        fetch('https://arcane-escarpment-80078.herokuapp.com/news', {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "title":title,
                "description":description
            })
        })
        .then(res => res.json())
        .then(async (newsData) => {
            console.log(newsData);
            navigation.replace('Admin');
        })
        .catch(err => console.log(err));
    };

    
    const deleteNews = (id) => {
        fetch(`https://arcane-escarpment-80078.herokuapp.com/news/${id}`,{
            method: 'DELETE', 
            headers: { 
                'Content-type': 'application/json'
            } 
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            navigation.replace('Admin');
        });
    };

    return (
        <View style={styles.container}>

            <Modal 
                visible={modalOpen}
                animationType='slide'
                transparent={true}
            >
                <View style={styles.centeredView}>

                    <View style={styles.modalContent}>

                        <TouchableOpacity
                            style={{alignItems:'flex-end',marginTop:10, marginRight:10}}
                            onPress={() => setModalOpen(false)}
                        >


                            <Entypo name="cross" size={29} color="black"  />

                        </TouchableOpacity>

                        <TextInput 
                            label="Title"
                            mode="outlined"
                            theme={{colors:{primary:"blue"}}}
                            style={styles.textInput}
                            autoCapitalize='none'
                            value={title}
                            onChangeText={(value) => setTitle(value) }
                        />

                        <TextInput 
                            label="Description"
                            mode="outlined"
                            theme={{colors:{primary:"blue"}}}
                            style={styles.textInput}
                            autoCapitalize='none'
                            multiline
                            value={description}
                            onChangeText={(value) => setDescription(value)} 
                        />

                        <Button
                            mode="contained"
                            style={styles.saveButton}
                            onPress={() => {
                                if(title === '' || description === ''){
                                    return Alert.alert('Please fill title and description.');
                                }
                                ToastAndroid.show("Please wait.", ToastAndroid.LONG);
                                sendContent();
                            }}
                        >
                            Save
                        </Button>
                
                    </View>
                
                </View>
            </Modal>
            
            
            {isLoading ? <ActivityIndicator /> :
                <FlatList 
                    data = {data}
                    keyExtractor={(id) => id._id}
                    showsVerticalScrollIndicator = {false}
                    renderItem={ ({item}) => {
                        return (
                            <View style={styles.cards}>

                                {/* <Modal
                                    visible={deleteConfirmModal}
                                    
                                    transparent={true}
                                >

                                    <View style={styles.centeredView}>

                                        <View style={styles.modalContent}>

                                                <Text>Are you sure you want to delete this news?</Text>
                                                <View style={styles.confirmButton}>

                                                    <TouchableOpacity
                                                        onPress={() => deleteNews(item._id)}
                                                    >

                                                        <Text>Yes</Text>
                                                    
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        onPress={() => setDeleteConfirmModal(false)}
                                                    >

                                                        <Text>No</Text>
                                                    
                                                    </TouchableOpacity>

                                                </View>
                                                
                                        </View>
                                    
                                    </View>
                            
                                </Modal> */}

                                <Text style={styles.title}>{item.title} </Text>

                                <Text style={styles.description}>{item.description}</Text>
                                
                                <View style={styles.rowDirection}>
                                    <TouchableOpacity
                                        style = {styles.deleteButton}
                                        onPress = {() => {
                                            deleteNews(item._id);
                                        }} 
                                    >

                                        <AntDesign name="delete" size={24} color="black"  />

                                    </TouchableOpacity>

                                    <Text style={styles.date}>{item.date}</Text>

                                </View>
                                
                            </View>
                        );
                    }}
                />
            }

        
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setModalOpen(true)}
                style={styles.touchableOpacityStyle}
            >
                <Image
                    source={require('./plus.png')}
                    style={styles.floatingButtonStyle}
                />
            </TouchableOpacity>
         
        </View>
    );
};

const styles = StyleSheet.create({
 
    container:{
        flex:1,
        backgroundColor:'#78fdff',

    },

    textInput:{
        marginHorizontal:10,
        marginBottom:10,
        backgroundColor:'white'
    },

    saveButton:{
        marginHorizontal:55,
        marginBottom:17,
        marginTop:10
    },

    cards:{
        borderColor: '#3644a1',
        borderWidth:3,
        marginHorizontal:7,
        marginVertical:5,
        borderRadius:12,
        padding:8,
        backgroundColor:'#ffffff',
        
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

    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 16,
        bottom: 16,
       
    },

    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    rowDirection:{
        flexDirection:'row',
    },
    deleteButton:{
        paddingLeft:10,
        marginTop:5,
        flex:2
    },

    date:{
        flex:1,
        alignSelf:'flex-end',
        marginLeft:10
    },

    modalContent:{
        borderColor:'#3644a1',
        borderWidth:3,
        margin:15,
        borderRadius:30,
        backgroundColor:'white'
    },

    centeredView: {
        flex:1,
        justifyContent:'center',
    },

    confirmButton:{
        flexDirection:'row',
    }
});


export default AdminHomeScreen;