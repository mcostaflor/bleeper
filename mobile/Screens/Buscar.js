import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native-gesture-handler';
import Axios from 'axios';
import { config } from '../Services';

class Buscar extends Component {

    state = {
        stringBusca: '',
        fetchingUsuario: false,
        fetchingBleeps: false,
        usuarios: [],
        bleeps: [],
        activeTab: 'usuario'
    }

    componentDidMount() {
        this.handleChange('');
    }

    handleChange = (text) => {

        this.setState({ stringBusca: text, fetchingUsuario: true, fetchingBleeps: true }, () => {

            Axios.get(`${config.api.baseUrl}/api/usuario/busca`, {
                params: {
                    string: this.state.stringBusca
                }
            })
                .then(res => {
                    this.setState({ usuarios: res.data, fetchingUsuario: false });
                })
                .catch(error => {
                    console.log(error);
                    this.set
                    State({ fetchingUsuario: false });
                });
            Axios.get(`${config.api.baseUrl}/api/bleep/busca`, {
                params: {
                    string: this.state.stringBusca
                }
            })
                .then(res => {
                    this.setState({ bleeps: res.data, fetchingBleeps: false });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ fetchingBleeps: false });
                });
        });
    }

    render() {
        return (
            <View style={{ minHeight: '100%' }}>
                <View style={{ height: 56, flexDirection: 'row', backgroundColor: config.theme.colors.main }}>
                    <View style={{ width: 56, height: 56, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ width: 40, height: 40, backgroundColor: config.theme.colors.main, alignItems: 'center', justifyContent: 'center', borderRadius: 90 }}>
                            <Icon name={'chevron-left'} size={24} color={'#FFF'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                        <View
                            style={{ backgroundColor: '#FFF', height: 40, borderRadius: 15, marginRight: 8, padding: 0, paddingHorizontal: 5, position: 'relative', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <TextInput
                                style={{ fontSize: 18, padding: 0, paddingHorizontal: 8, flex: 1 }}
                                onChangeText={this.handleChange}
                                placeholder={'Buscar'}
                                value={this.state.stringBusca}
                            />
                            <Icon name={'magnify'} size={24} color={'#555'} style={{}} />
                        </View>
                    </View>
                </View>
                <ScrollView horizontal contentContainerStyle={{ alignItems: "stretch" }} style={{ backgroundColor: '#EEE', padding: 8, minHeight: 42 }}>
                    <TouchableOpacity onPress={() => { this.setState({ activeTab: 'usuario' }) }} style={{ backgroundColor: '#FFF', padding: 4, borderRadius: 15, marginRight: 12 }}>
                        <Text style={{ paddingHorizontal: 12, fontSize: 14 }}>
                            Usuários
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setState({ activeTab: 'bleeps' }) }} style={{ backgroundColor: '#FFF', padding: 4, borderRadius: 15, marginRight: 12 }}>
                        <Text style={{ paddingHorizontal: 12, fontSize: 14 }}>
                            Bleeps
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView style={{ minHeight: '100%' }}>
                    {this.state.activeTab === 'usuario' &&
                        <>
                            <View
                                style={{ borderRadius: 5, padding: 4, paddingVertical: 8, marginHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Text style={{ fontSize: 32, fontWeight: 'bold', flex: 1 }}>
                                    Usuários
                        </Text>
                                <View style={{ backgroundColor: '#DDD', borderRadius: 90 }}>
                                    <Icon name="chevron-right" size={24} color={'#000'} />
                                </View>
                            </View>
                            {this.state.usuarios.length > 0 ?
                                this.state.usuarios.map((item, index) => (
                                    <TouchableOpacity
                                        onPress={() => { this.props.navigation.push('Usuario', { usuario: { _id: item._id, usuario: item.usuario } }) }}
                                        key={item._id}
                                        style={{ backgroundColor: '#EEE', borderRadius: 15, padding: 8, marginHorizontal: 8, marginBottom: 8, flexDirection: 'row', borderColor: '#ddd', borderWidth: 1 }}
                                    >
                                        <View style={{ alignItems: "center", justifyContent: 'center', marginRight: 8 }}>
                                            <View style={{ width: 40, height: 40, borderRadius: 90, backgroundColor: '#888' }} />
                                        </View>
                                        <View style={{ flex: 1, alignItems: "flex-start", justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 16 }}>
                                                {item.nome}
                                            </Text>
                                            <Text>
                                                @{item.usuario}
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 12 }}>
                                                6 seguidores
                                    </Text>
                                            <Text style={{ fontSize: 12 }}>
                                                8 bleeps
                                    </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                                :
                                <View style={{ height: 40 }}>

                                </View>
                            }
                        </>
                    }
                    {this.state.activeTab === 'bleeps' &&
                        <>
                            <View
                                style={{ borderRadius: 5, padding: 4, paddingVertical: 8, marginHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Text style={{ fontSize: 32, fontWeight: 'bold', flex: 1 }}>
                                    Bleeps
                        </Text>
                                <View style={{ backgroundColor: '#DDD', borderRadius: 90 }}>
                                    <Icon name="chevron-right" size={24} color={'#000'} />
                                </View>
                            </View>
                            <FlatList
                                data={this.state.bleeps}
                                renderItem={({ item }) => (
                                    <View style={{ height: 100 }}>
                                        <Text>
                                            {item.texto}
                                        </Text>
                                    </View>
                                )}
                                keyExtractor={item => item._id}
                            />
                        </>
                    }



                </ScrollView>

                {/*Imprementar abas depois que estiver tudo certo com os dados.*/}
                {/* <Nav navigation={this.props.navigation} /> */}
            </View >
        )
    }
}

export default Buscar;