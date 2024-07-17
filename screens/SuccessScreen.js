import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Logado com sucesso!</Text>
      <Pressable style={styles.button}  onPress={() => navigation.navigate('Login')} >
                    <Text style={styles.buttontext}>Voltar para o login</Text>
                </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#1d2f40',
  },
  successText: {
    fontSize: 24,
    marginBottom: 16,
    color:'white'
  },button:{
    backgroundColor: '#f35c22',  
    borderRadius: 10,  
    width: 150, 
    height: 40,  
    justifyContent:'center',
    textAlign:'center'
},
buttontext:{
    justifyContent:'center',
    textAlign:'center',
    color:'white'
}   
});
