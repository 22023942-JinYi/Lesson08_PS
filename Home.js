import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 15,
        margin: 10,
        textAlign: 'left',
    },
    opacityStyle: {
        borderWidth: 1,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        fontWeight:'bold',
        fontFamily:'impact'
    },
    imageStyle: {
        width: 150,
        height: 200,
        alignSelf: 'flex-end',
        top: '-25%',
        right: 10,
        position: 'relative',
        marginBottom: -40
    }
});

const Home = ({navigation}) => {

    const [mydata, setMydata] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem("moviedata");
        if (datastr!=null){
            const jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        }
        else {
            setMydata(datasource);
        }

    };

    getData();

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.opacityStyle}
                              onPress={()=>
                              {
                                  let datastr = JSON.stringify(mydata);
                                  navigation.navigate("Edit",{index:index, type:section.title, key:item.key, isbn:item.isbn, image:item.image, copies:item.copies, datastring:datastr});
                              }
                              }
            >
                <Text style={styles.headerText}>{item.key}</Text>
                <Text style={styles.textStyle}>ISBN: {item.isbn}</Text>
                <Text style={styles.textStyle}>Copies Owned: {item.copies}</Text>
                <Image source={{ uri: item.image }} style={styles.imageStyle} resizeMode="contain" />
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <StatusBar/>
            <Button title='New Book' onPress={()=>{
                let datastr = JSON.stringify(mydata);
                navigation.navigate("Add", {datastring:datastr});
            }
            }
            />
            <SectionList sections={mydata} renderItem={renderItem}
                         /*renderSectionHeader={({section:{title}})=>(
                             <Text style={[styles.headerText]}>
                                 {title}
                             </Text>
                         )}*//>
        </View>
    );
};

export default Home;
