import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Text, AsyncStorage } from 'react-native';
import Toolbar from '../Components/Toolbar';
import Axios from 'axios';

// import { Container } from './styles';
const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    TextInput: {
        borderRadius: 5,
        backgroundColor: '#DDD',
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginBottom: 8
    },
})
export default class Cadastrar extends Component {

    state = {
        nome: '',
        usuario: '',
        senha: '',
        senha2: '',
        email: '',
    }

    handleEsqueceu = () => {
        Axios.post(`${config.api.baseUrl}/api/usuario/esqueceu`, {
            usuario: this.state.usuario,
            email: this.state.email,
        }, {
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                alert(res.data.nome);
            })
            .catch(error => {
                alert(error)
            });
    };

    render() {
        return (
            <View>
                <Toolbar leftIcon={'chevron-left'} leftAction={() => { this.props.navigation.goBack() }} title={"Cadastrar"} {...this.props} />
                <View style={styles.container}>
                    <Text>Usuário</Text>
                    <TextInput onChangeText={text => { this.setState({ usuario: text }) }} value={this.state.usuario} style={styles.TextInput} />
                    <Text>E-mail</Text>
                    <TextInput onChangeText={text => { this.setState({ email: text }) }} value={this.state.email} style={styles.TextInput} />
                    <Button onPress={this.handleEsqueceu} title={"Enviar"} />
                </View>
            </View>
        );
    }
}
