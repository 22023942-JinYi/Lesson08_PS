import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Add = ({navigation, route}) => {
    const[title,setTitle] = useState("");
    const[isbn,setISBN] = useState("");
    const[url,setUrl] = useState("");
    const[copies,setCopies] = useState("");

    const setData = async(value) => {
        AsyncStorage.setItem("moviedata",value);
        navigation.navigate("Home");

    };

    return (
        <View>
            <StatusBar/>
            <Text style={{margin: 5}}>Title:</Text>
            <TextInput style={{borderWidth:1, margin:5}} onChangeText={(text)=>setTitle(text)}/>
            <Text style={{margin: 5}}>ISBN:</Text>
            <TextInput style={{borderWidth:1, margin:5}} onChangeText={(text)=>setISBN(text)}/>
            <Text style={{margin: 5}}>Image URL:</Text>
            <TextInput style={{borderWidth:1, margin:5}} onChangeText={(text)=>setUrl(text)}/>
            <Text style={{margin: 5}}>Copies Owned:</Text>
            <TextInput style={{borderWidth:1, margin:5}} onChangeText={(text)=>setCopies(text)}/>

            <Button title='Submit'
                    onPress={ ( )=>{
                        let mydata = JSON.parse(route.params.datastring);
                        let item = {key:title, isbn:isbn, copies:copies, image:url};
                        mydata[0].data.push(item);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);

                    }

                    }
            />
        </View>
    );
};

export default Add;
