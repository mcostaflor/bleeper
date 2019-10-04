import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Toolbar from '../Components/Toolbar';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { config } from '../Services';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
    }
});

class Login extends Component {

    static navigationOptions = {
        drawerLabel: () => null
    }
    state = {
        usuario: '',
        senha: ''
    }

    handleLogin = () => {
        Axios.post(`${config.api.baseUrl}/api/usuario/token`, {
            usuario: this.state.usuario,
            senha: this.state.senha
        }, {
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                if (res.data.token && res.data.usuario) {
                    AsyncStorage.setItem('token', res.data.token, (error) => {
                        if (error) {
                            alert(error);
                        } else {
                            AsyncStorage.setItem('usuario', JSON.stringify(res.data.usuario), (error) => {
                                this.props.dispatch({ type: 'SET_USER', payload: { usuario: res.data.usuario, token: res.data.token } })
                                this.props.navigation.navigate('Início');
                            });
                        }
                    });

                } else {
                    alert("Usuário ou senha incorretos.")
                }
            })
            .catch(error => {
                alert('Não foi possível validar as credenciais com o servidor. Favor tentar novamente mais tarde.')
            });
    }
    render() {
        return (
            <View>
                {/* <Toolbar leftIcon={'menu'} leftAction={() => { this.props.navigation.openDrawer() }} title={"Entrar"} {...this.props} /> */}
                <View style={{ height: 56, backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0 }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Início') }} style={{ height: 56, width: 56, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={'arrow-left'} color={config.theme.colors.main} size={28} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', height: '100%' }}>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ minWidth: '80%' }}>
                        <Text style={{ fontSize: 24, fontStyle: 'bold', marginBottom: 16, justifyContent: 'center' }}>
                            Entre no Bleeper <Icon name={'chevron-right'} color={'#000'} size={24} />
                        </Text>
                        <TextInput
                            onChangeText={text => { this.setState({ usuario: text }) }}
                            value={this.state.usuario}
                            placeholder={'Usuário ou e-mail'}
                            style={{ marginBottom: 4, fontSize: 16, paddingVertical: 2, paddingHorizontal: 8, borderRadius: 8, borderWidth: 2, borderColor: config.theme.colors.main }}
                        />
                        <TextInput
                            onChangeText={text => { this.setState({ senha: text }) }}
                            value={this.state.senha}
                            placeholder={'Senha'}
                            style={{ marginBottom: 16, fontSize: 16, paddingVertical: 2, paddingHorizontal: 8, borderRadius: 8, borderWidth: 2, borderColor: config.theme.colors.main }} />

                        <TouchableOpacity onPress={this.handleLogin} style={{ marginBottom: 4, backgroundColor: config.theme.colors.main, borderRadius: 8, paddingVertical: 8, alignItems: 'center', justifyContent: 'center' }}>
                            <View>
                                <Text style={{ fontSize: 18, color: '#FFF' }}>
                                    ENVIAR
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Cadastrar') }}
                            style={{ marginBottom: 4, backgroundColor: '#FFF', borderWidth: 2, borderColor: config.theme.colors.main, borderRadius: 8, paddingVertical: 4, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <View>
                                <Text style={{ color: config.theme.colors.main }}>
                                    CADASTRAR
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Esqueceu') }}
                            style={{ marginBottom: 4, backgroundColor: '#FFF', borderWidth: 2, borderColor: config.theme.colors.main, borderRadius: 8, paddingVertical: 4, alignItems: 'center', justifyContent: 'center' }}
                        >
                            <View>
                                <Text style={{ color: config.theme.colors.main }}>
                                    ESQUECI MINHA SENHA
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    usuario: state.usuario
});
export default connect(mapStateToProps, null)(Login);