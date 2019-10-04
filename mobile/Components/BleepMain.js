import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#DDD'
    },
    leftSection: {
        width: 48,
        minHeight: 48,
        alignItems: 'center',
        padding: 6
    },
    header: {
        paddingHorizontal: 8,
        paddingTop: 8,
        flexDirection: 'row'
    },
    textoContainer: {
        paddingHorizontal: 8
    },
    nomeContainer: {
        marginRight: 8
    },
    texto: {
        fontSize: 20,
        paddingVertical: 16
    },
    content: {
        flex: 1,
        paddingRight: 8
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#DDD',
        borderTopWidth: 1
    }
});

class Bleep extends Component {
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => { this.props.navigation.push('Usuario', { usuario: { _id: this.props.autor._id, usuario: this.props.usuario } }) }}><View style={{ width: 48, height: 48, backgroundColor: 'grey', borderRadius: 180 }} /></TouchableOpacity>
                            <View style={{ paddingLeft: 8, alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
                                <View style={styles.nomeContainer}>
                                    <Text style={{ fontSize: 20 }}>
                                        {this.props.autor.nome}
                                    </Text>
                                </View>
                                <View style={styles.userContainer}>
                                    <Text style={styles.user}>
                                        @{this.props.autor.usuario}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlign: 'right' }}>
                                    {this.props.data}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.textoContainer}>
                            <Text style={styles.texto}>
                                {this.props.texto}
                            </Text>
                        </View>
                        <View style={styles.footer}>
                            <View style={{ flex: 1, padding: 8 }}>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#888' }}>
                                        <Icon name="message-outline" color="#888" size={18} /> 0
                                </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#888' }}>
                                        <Icon name="heart-outline" color="#888" size={18} /> 0
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

export default Bleep;
