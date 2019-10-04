import React, { Component } from 'react';
import Toolbar from '../Components/Toolbar';
import { View, StyleSheet, ActivityIndicator, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Bleep from '../Components/Bleep';
import Axios from 'axios';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    titulo: {
        fontSize: 32
    },
    container: {
        minHeight: '100%',
        flex: 1,
        position: 'relative'
    }
});

export default class Home extends Component {

    state = {
        bleeps: []
    }

    render() {
        return (
            <>
                <View style={styles.container} >
                    <View style={{ zIndex: 1500, borderRadius: 90, backgroundColor: '#DDD', position: 'absolute', right: 16, bottom: 16, height: 64, width: 64, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('NovoBleep') }}>
                            <Icon name={'menu'} size={32} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <Toolbar leftIcon="menu" leftAction={() => { this.props.navigation.openDrawer() }} title={"Inicio"} {...this.props} />
                    <View style={{ padding: 16, height: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                            Not yet implemented, caraio
                        </Text>
                    </View>
                </View>
            </>
        );
    }
}
