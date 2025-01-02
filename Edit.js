import React,{useState} from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({navigation, route}) => {
    const[title,setTitle] = useState(route.params.key);
    const[isbn,setISBN] = useState(route.params.isbn);
    const[url,setUrl] = useState(route.params.image);
    const[copies,setCopies] = useState(route.params.copies);

    const setData = async(value) => {
        AsyncStorage.setItem("moviedata",value);
        navigation.navigate("Home");

    };

    return (
        <View>
            <Text style={{margin: 5}}>Letter:</Text>
            <TextInput value={title} style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}/>
            <Text style={{margin: 5}}>ISBN:</Text>
            <TextInput value={isbn} style={{borderWidth:1}} onChangeText={(text)=>setISBN(text)}/>
            <Text style={{margin: 5}}>Image URL:</Text>
            <TextInput value={url} style={{borderWidth:1}} onChangeText={(text)=>setUrl(text)}/>
            <Text style={{margin: 5}}>Copies Owned:</Text>
            <TextInput value={copies} style={{borderWidth:1}} onChangeText={(text)=>setCopies(text)}/>
            <View style={{flexDirection:"row"}}>
                <View style={{margin:10,flex:1}}>
                    <Button title='Save'
                            onPress={()=>{
                                let mydata = JSON.parse(route.params.datastring);
                                mydata[0].data[route.params.index].key=title;
                                mydata[0].data[route.params.index].isbn=isbn;
                                mydata[0].data[route.params.index].image=url;
                                mydata[0].data[route.params.index].copies=copies;
                                let stringdata = JSON.stringify(mydata);
                                setData(stringdata);
                                navigation.navigate("Home")
                            }
                            }
                    />
                </View>
                <View style={{margin:10,flex:1}}>
                    <Button title='Delete'
                            onPress={()=>{
                                let mydata = JSON.parse(route.params.datastring);
                                Alert.alert("Are you sure?",'',
                                    [{text:'Yes', onPress:()=>{
                                            mydata[0].data.splice(route.params.index,1);
                                            let stringdata = JSON.stringify(mydata);
                                            setData(stringdata);
                                            navigation.navigate("Home")
                                        }},
                                        {text:'No'}])
                            }
                            }
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
