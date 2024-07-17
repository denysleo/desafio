import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from "../firebaseconfig";
import Icon from 'react-native-vector-icons/FontAwesome';
import CryptoJS from 'crypto-js'; // Importe CryptoJS


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const hashPassword = (password) => {
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        return hashedPassword;
    };
    const handleLogin = async () => {
        try {
            const q = query(collection(firestore, 'users'), where('email', '==', email));
            const queryResults = await getDocs(q);
            if (queryResults.empty) {
                setError('Usuário ou senha incorretos');
                return;
            }
            let valid = false;
            queryResults.forEach((doc) => {
                const userData = doc.data();
                const hashedPasswordInput = hashPassword(password);
                if (hashedPasswordInput === userData.password) {
                    valid = true;
                }
            });
            if (valid) {
                setEmail('');
                setPassword('');
                setError('');
                navigation.navigate('Success');
            } else {
                setError('Usuário ou senha incorretos');
            }
        } catch (error) {
            setError('Erro ao fazer o login');
        }
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ffffff"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                color='white'
            /><View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Senha"
                    placeholderTextColor="#ffffff" 
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword} 
                    color="white" 
                />
                <Pressable style={styles.iconContainer} onPress={toggleShowPassword}>
                    <Icon
                        name={showPassword ? 'eye-slash' : 'eye'}
                        size={20}
                        color="white"
                    />
                </Pressable>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttontext}>Entrar</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1d2f40',
        flex: 1,
        justifyContent: 'center',

        padding: 16,
    },
    title: {
        fontSize: 20,
        marginTop: -50,
        marginBottom: 50,
        color: 'white',

        textAlign: 'center'
    },
    input: {
        height: 40,
        borderWidth: 1,
        fontSize: 20,
        borderColor: '#f35c22',

        marginBottom: 12,
        paddingHorizontal: 8

    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#f35c22',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 12,
    },
    passwordInput: {
        flex: 1,
        height: 40,
        fontSize: 20,
        paddingHorizontal: 8,
        color: 'white', 
    },
    iconContainer: {
        padding: 10,
    },
    error: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#f35c22',  
        borderRadius: 10, 
        width: 150,  
        height: 40, 
        justifyContent: 'center',
        textAlign: 'center'
    },
    buttontext: {
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white'
    }

})
