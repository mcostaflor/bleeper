import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, Button, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { config } from '../Services';

import Axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BleepReplied from '../Components/BleepReplied';

const styles = StyleSheet.create({

});

export default class NovoBleep extends Component {

    state = {
        textInput: ''
    }

    setText = (text) => {
        this.setState({ textInput: text })
    }

    handleBleep = () => {

        AsyncStorage.getItem('token', (error, token) => {
            var url = '';
            var headers = { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` };
            var data = { texto: this.state.textInput };

            alert(token)

            if (this.props.navigation.getParam('bleep')) {
                var replyId = this.props.navigation.getParam('bleep')._id;
                url = `${config.api.baseUrl}/api/bleep/${replyId}/reply`;
            } else {
                url = `${config.api.baseUrl}/api/bleep/`;
            }
            Axios.post(url, {}, { headers, data })
                .then(res => {
                    alert('postou');
                    this.props.navigation.pop();
                })
                .catch(error => {
                    alert(error)
                })

        })
    }

    render() {
        return (
            <View>
                <View style={{ height: 56, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ height: 56, width: 56, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name={'close'} size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', padding: 16 }}>
                        <Button onPress={this.handleBleep} title={'Enviar'} />
                    </View>
                </View>
                {this.props.navigation.getParam('bleep') &&
                    <BleepReplied
                        id={this.props.navigation.getParam('bleep')._id}
                        usuario={this.props.navigation.getParam('bleep').autor.usuario}
                        nome={this.props.navigation.getParam('bleep').autor.nome}
                        texto={this.props.navigation.getParam('bleep').texto}
                        {...this.props}
                    />
                }
                <ScrollView style={{}}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 56, alignItems: 'center', paddingTop: 8 }}>
                            <View style={{ backgroundColor: '#AAA', width: 40, height: 40, borderRadius: 90 }} />
                        </View>
                        <View style={{ flex: 1, paddingTop: 8 }}>
                            <TextInput placeholder={'Qual a boa?'} onChangeText={this.setText} multiline numberOfLines={10} style={{ flex: 1, fontSize: 18, backgroundColor: '#F4F4F4', padding: 8, paddingVertical: 4, textAlignVertical: 'top' }} />
                            <Text>{this.state.textInput.length}/140</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
