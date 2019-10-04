import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DDD',
        backgroundColor: '#F5F5F5'
    },
    leftSection: {
        width: 48,
        minHeight: 48,
        alignItems: 'center',
        padding: 6
    },
    header: {
        flexDirection: 'row'
    },
    nomeContainer: {
        marginRight: 8
    },
    nome: {

    },
    userContainer: {

    },
    user: {

    },
    textoContainer: {
    },
    texto: {
        fontSize: 18
    },
    content: {
        flex: 1,
        paddingRight: 8
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

class Bleep extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => { if (!this.props.routed) { this.props.navigation.push('Bleep', { id: this.props.id }) } }}>
                <View style={styles.container}>
                    <View style={styles.leftSection}>
                        <Icon name={'reply'} size={32} color="#AAA" />
                    </View>
                    <View style={styles.leftSection}>
                        <View style={{ width: 32, height: 32, backgroundColor: 'grey', borderRadius: 180 }} />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View style={styles.nomeContainer}>
                                <Text style={styles.nome}>
                                    {this.props.nome}
                                </Text>
                            </View>
                            <View style={styles.userContainer}>
                                <Text style={styles.user}>
                                    @{this.props.usuario}
                                </Text>
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
                            <View style={{ marginRight: 8 }}>
                                <Text>
                                    $0 respostas
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text>
                                    $0 curtidas
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default Bleep;
