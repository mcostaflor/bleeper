import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Text, AsyncStorage } from 'react-native';
import Toolbar from '../Components/Toolbar';
import Axios from 'axios';
import { config } from '../Services';

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

    handleCreate = () => {
        Axios.post(`${config.api.baseUrl}/api/usuario/registro`, {
            nome: this.state.nome,
            usuario: this.state.usuario,
            senha: this.state.senha,
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
                    <Text>Nome</Text>
                    <TextInput onChangeText={text => { this.setState({ nome: text }) }} value={this.state.nome} style={styles.TextInput} />
                    <Text>Usuário</Text>
                    <TextInput onChangeText={text => { this.setState({ usuario: text }) }} value={this.state.usuario} style={styles.TextInput} />
                    <Text>E-mail</Text>
                    <TextInput onChangeText={text => { this.setState({ email: text }) }} value={this.state.email} style={styles.TextInput} />
                    <Text>Senha</Text>
                    <TextInput onChangeText={text => { this.setState({ senha: text }) }} value={this.state.senha} style={styles.TextInput} />
                    <Text>Confirmar Senha</Text>
                    <TextInput onChangeText={text => { this.setState({ senha2: text }) }} value={this.state.senha2} style={styles.TextInput} />
                    <Button onPress={this.handleCreate} title={"Enviar"} />
                </View>
            </View>
        );
    }
}
