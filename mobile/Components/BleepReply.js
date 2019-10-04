import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({

});

class Bleep extends Component {

    componentDidMount() {
        // alert(this.props.super);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => { if (!this.props.routed) { this.props.navigation.push('Bleep', { id: this.props.id }) } }}>
                <View style={{ flexDirection: 'row', borderBottomColor: '#DDD', borderBottomWidth: 1, padding: 8 }}>
                    <View style={{ width: 40, height: 40, backgroundColor: 'grey', borderRadius: 180 }} />
                    <View style={{ flexDirection: 'column', flex: 1, paddingHorizontal: 8 }}>
                        <View>
                            <Text style={{ fontSize: 12,color: '#999', fontStyle: 'italic' }}>
                                Em resposta a @{this.props.super.autor.usuario}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 4 }}>
                                <Text style={{ fontSize: 12 }}>
                                    {this.props.nome}
                                </Text>
                            </View>
                            <View style={{ marginRight: 4 }}>
                                <Text style={{ fontSize: 12 }}>
                                    @{this.props.usuario}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginBottom: 16, marginTop: 8 }}>
                            <Text style={{ fontSize: 14 }}>
                                {this.props.texto}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                            <View style={{ marginRight: 8 }}>
                                <Text style={{ fontSize: 12 }}>
                                    $0 respostas
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text style={{ fontSize: 12 }}>
                                    $0 curtidas
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }} >
                                <Text style={{ fontSize: 10 }}>
                                    {this.props.data}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        );
    }
}

export default Bleep;
