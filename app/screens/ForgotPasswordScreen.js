import React, {useState, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import { server_url } from '../components/server_info';

export default function ForgotPasswordScreen({navigation}) {
    const [email, setEmail] = useState('')

    const requestPasswordChange = async() => {
        if (email != ''){
            let response = await fetch(server_url + "/forgotPassword", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            })
            let json = await response.json();
            if (json === "Email sent"){
                Alert.alert('', json, [{text: "Ok", onPress: () => navigation.navigate("GetToken")}]);
            }
            else{
                Alert.alert('', json);
            }
        }
    }

    return (
        <View style={styles.regform}>
            <Text style={styles.header}>Enter a user email</Text>
            <TextInput style={styles.textinput} placeholder={"johncena@gmail.com"} onChangeText={(val) => setEmail(val)}></TextInput>
            <TouchableOpacity style={styles.button} onPress={() => requestPasswordChange()}>
                <Text style={styles.buttontext}>Send confirmation email</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    regform:{
        alignSelf: "stretch",
        flex: 1,
        paddingLeft: 60,
        paddingRight: 60,
        justifyContent: "center"
    },
    header:{
        fontSize: 24,
        color: "black",
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: "#199187",
        borderBottomWidth: 1,
    },
    textinput:{
        alignSelf: "stretch",
        height: 40,
        marginBottom: 30,
        color: "grey",
        borderBottomColor: "#199187",
        borderBottomWidth: 1,
    },
    button: {
        alignSelf: "stretch",
        alignItems: "center",
        padding: 20,
        backgroundColor: "grey",
        marginTop: 30,
    },
    buttontext:{
        color: "#fff",
        fontWeight: "bold"
    },
    forgotpassword: {
        color: "#00ffff",
        fontWeight: "bold"
    }
})