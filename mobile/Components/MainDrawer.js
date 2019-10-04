import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { config } from '../Services';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        padding: 24,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomColor: '#DDD',
        borderBottomWidth: 1
    },
    avatarCont: {
        borderRadius: 180,
        backgroundColor: config.theme.colors.main,
        width: 48,
        height: 48
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    item: {
        flexDirection: 'row',
        // height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#FFF',
    },
    itemText: {
        fontSize: 18,
        color: '#000'
    },
})

class MainDrawer extends Component {

    componentDidMount() {
        AsyncStorage.getItem('usuario', (error, result) => {
            AsyncStorage.getItem('token', (error, token) => {
                if (result && token) {
                    this.props.dispatch({ type: 'SET_USER', payload: { usuario: JSON.parse(result), token: token } });
                }
            })
        });
    }

    handleLogout = () => {
        this.props.dispatch({ type: 'DELETE_USER' });
        AsyncStorage.removeItem('usuario');
        AsyncStorage.removeItem('token');
    }

    render() {
        const itemsToRender = this.props.items.filter((route, index) => {
            if (this.props.usuario) {
                if (route.key === 'Entrar') {
                    return false;
                }
            } else {
                if (route.key === 'Perfil') {
                    return false;
                }
            }

            return true;
        });
        return (
            <View style={{ height: '100%' }}>
                <StatusBar backgroundColor={config.theme.colors.darker} barStyle="light-content" />
                {this.props.usuario &&
                    <View style={styles.header}>
                        <View style={styles.avatarCont} />
                        {this.props.usuario ?
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 16 }}>
                                <View style={styles.user}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>
                                            {this.props.usuario.nome}
                                        </Text>
                                        <Text style={{ color: '#000', fontSize: 16 }}>
                                            @{this.props.usuario.usuario}
                                        </Text>
                                        <View style={{ paddingTop: 24, flexDirection: 'row' }}>
                                            <Text style={{ marginRight: 16, color: '#000' }}>24 seguidores</Text>
                                            <Text style={{ color: '#000' }}>192 bleeps</Text>
                                        </View>
                                    </View>
                                    <View style={{}}>
                                        <Icon onPress={() => { this.props.navigation.navigate('Perfil') }} name={'chevron-right'} size={24} color="#444" />
                                    </View>
                                </View>
                            </View>
                            : <View />
                        }
                    </View>
                }
                <View>
                    {this.props.usuario ?
                        <>
                            {this.props.usuario &&
                                <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 90 }} >
                                    <TouchableOpacity style={{ paddingVertical: 8, paddingLeft: 12, paddingRight: 18, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', borderRadius: 90, backgroundColor: config.theme.colors.main }} onPress={() => { this.props.navigation.push('NovoBleep') }}>
                                        <View>
                                            <Icon name={'pen'} size={24} style={{ marginRight: 16 }} color="#FFF" />
                                        </View>
                                        <Text style={{ fontSize: 18, color: '#FFF' }}>
                                            {'Bleep'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <TouchableOpacity style={styles.item} onPress={() => { this.props.navigation.navigate('Home') }} >
                                <View>
                                    <Icon name={'home'} size={24} style={{ marginRight: 16 }} color="#000" />
                                </View>
                                <Text style={styles.itemText}>
                                    {'Início'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => { this.props.navigation.navigate('Buscar') }} >
                                <View>
                                    <Icon name={'magnify'} size={24} style={{ marginRight: 16 }} color="#000" />
                                </View>
                                <Text style={styles.itemText}>
                                    {'Buscar'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => { this.props.navigation.push('Usuario', { edit: true, usuario: { usuario: this.props.usuario.usuario, _id: this.props.usuario._id } }) }} >
                                <View>
                                    <Icon name={'account'} size={24} style={{ marginRight: 16 }} color="#000" />
                                </View>
                                <Text style={styles.itemText}>
                                    {'Perfil'}
                                </Text>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                            <TouchableOpacity style={styles.item} onPress={() => { this.props.navigation.navigate('Início') }} >
                                <View>
                                    <Icon name={'home'} size={24} style={{ marginRight: 16 }} color="#000" />
                                </View>
                                <Text style={styles.itemText}>
                                    {'Início'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={() => { this.props.navigation.navigate('Buscar') }} >
                                <View>
                                    <Icon name={'home'} size={24} style={{ marginRight: 16 }} color="#000" />
                                </View>
                                <Text style={styles.itemText}>
                                    {'Buscar'}
                                </Text>
                            </TouchableOpacity>

                        </>
                    }

                </View>
                <View style={{ borderTopColor: '#DDD', borderTopWidth: 1 }}>
                    {this.props.usuario ?
                        <TouchableOpacity style={styles.item} onPress={() => { this.handleLogout() }} >
                            <View>
                                <Icon name={'logout'} size={24} style={{ marginRight: 16 }} color="#000" />
                            </View>
                            <Text style={styles.itemText}>
                                {'Sair'}
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.item} onPress={() => { this.props.navigation.navigate('Login') }} >
                            <View>
                                <Icon name={'home'} size={24} style={{ marginRight: 16 }} color="#000" />
                            </View>
                            <Text style={styles.itemText}>
                                {'Entrar'}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View >
        )
    }
};

const mapStateToProps = state => ({
    usuario: state.usuario.usuario
});

export default connect(mapStateToProps, null)(MainDrawer);