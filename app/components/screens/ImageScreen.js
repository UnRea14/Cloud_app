import {useState, useEffect} from 'react';
import * as React from 'react';
import {StyleSheet, ImageBackground, SafeAreaView, StatusBar, Alert} from 'react-native';
import  {server_url} from '../server_info';
import {Appbar, Menu} from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


export default function ImageView({navigation, route}) {
    const {user_ID, Filename, setState} = route.params;
    const [imageOBJ, SetImageOBJ] = useState({})
    const [openMenu,setOpenMenu] = useState(false)
    const path = FileSystem.documentDirectory + Filename;


    const DeleteImage = () => {
       fetch(server_url + "/deleteImage/" + user_ID + "/" + Filename)
        .then((response) => response.json())
            .then((json) => Alert.alert('', json, [{text: "Ok", onPress: () => navigation.goBack()}]), setState(true))
    }


    const DownloadImage = async() => {
        MediaLibrary.requestPermissionsAsync()
        await FileSystem.writeAsStringAsync(path, imageOBJ.base64, {encoding: FileSystem.EncodingType.Base64});
        const mediaResult = await MediaLibrary.saveToLibraryAsync(path);
    }

    useEffect(() => {
        fetch(server_url + "/Image/" + user_ID + "/" + Filename)
          .then((response) => response.json())
            .then((json) => SetImageOBJ(json))
        }, []);
    
        return (
            <SafeAreaView style={styles.AndroidSafeArea}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={Filename} />
                    <Menu
                        visible={openMenu}
                        onDismiss={()=>{
                            setOpenMenu(false)
                        }}
                        anchor={
                            <Appbar.Action icon="dots-vertical" color="white" onPress={() => setOpenMenu(true)} />
                        }>
                        <Menu.Item title="Download to phone" onPress={() => {DownloadImage()}} />
                        <Menu.Item title="Delete from cloud" onPress={() => {Alert.alert('', "Are you sure you want to delete this image from the cloud?", [{text: "Yes", onPress: () => DeleteImage()}, {text: "No"}])}} />
                        <Menu.Item title="Details" onPress={() => {Alert.alert('Image details', "name: " + imageOBJ.name + "\ndate uploaded: " + imageOBJ.date_uploaded)}} />
                    </Menu>
                </Appbar.Header>
                {imageOBJ.base64 != undefined ? (
                    <ImageBackground style={styles.image} source={{uri: 'data:image/jpeg;base64,' + imageOBJ.base64}}>
                    </ImageBackground>
                ): null}
        </SafeAreaView>
        )
}
const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    button: {
        alignSelf: "stretch",
        alignItems: "center",
        padding: 20,
        backgroundColor: "grey",
        marginTop: 30,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    buttontext:{
        color: "#fff",
        fontWeight: "bold"
    },
    regform:{
        alignSelf: "stretch",
        flex: 1,
        paddingLeft: 60,
        paddingRight: 60,
        justifyContent: "center"
    },
  });