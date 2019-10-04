import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { config } from '../Services';

const styles = StyleSheet.create({
    button: {
        height: '100%',
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 180
    },
    title: {
        flex: 1,
        height: '100%',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 24,
        color: '#fff'
    },
    container: {
        height: 56,
        flexDirection: 'row',
        backgroundColor: config.theme.colors.main,
        color: '#FFF'
    }
})

class Toolbar extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => { this.props.leftAction() }}>
                    <Icon name={this.props.leftIcon} size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        {this.props.title}
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { this.props.rightAction() }}>
                    <Icon name={this.props.rightIcon} size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        )
    }
}

Toolbar.defaultProps = {
    title: 'Bleeper'
}

export default Toolbar;