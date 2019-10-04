import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, PermissionsAndroid, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

import Toolbar from '../Components/Toolbar';
import config from '../Services/config';


const styles = StyleSheet.create({

});

class Configurar extends Component {

    state = {
        usuario: {

        }
    }

    componentDidMount() {
        AsyncStorage.getItem('usuario', (error, item) => {
            this.setState({
                usuario: JSON.parse(item)
            });
        })
    }

    handleProfilePicButton = () => {

        const granted = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Cool Photo App Camera Permission',
                message:
                    'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }).then((permission) => {
                console.log(permission);
            });


        ImagePicker.showImagePicker({
            title: 'Foto de Perfil',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }, (response) => {
            if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                alert('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                if (response.uri) {
                    this.setState({
                        avatarSource: source,
                    });
                }
            }
        })
    }
    handleCoverPicButton = () => {

        ImagePicker.showImagePicker({
            title: 'Foto de Perfil',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }, (response) => {
            if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                alert('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                if (response.uri) {
                    this.setState({
                        coverSource: source,
                    });
                }
            }
        })
    }

    render() {
        return (
            <View>
                <View style={{ paddingTop: '100%', position: 'relative' }}>
                    <View style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.6)', top: 16, left: 16, width: 40, height: 40, zIndex: 99999999, borderRadius: 90, alignItems: "center", justifyContent: 'center' }}>
                        <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={() => { this.props.navigation.pop() }}>
                            <Icon name={'arrow-left'} size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <ImageBackground source={this.state.coverSource} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                        <View style={{ position: 'absolute', zIndex: 9999, left: '25%', top: 72, height: '100%', width: '100%' }}>
                            <View style={{ height: '50%', width: '50%', backgroundColor: '#DDD', borderRadius: 180, borderColor: '#FFF', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#fff', borderRadius: 300 }}>
                                <Image source={this.state.avatarSource} style={{ height: '100%', width: '100%', borderRadius: 180 }} />
                                <View style={{ position: 'absolute', bottom: 16, right: 16, width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 90 }}>
                                    <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={this.handleProfilePicButton}>
                                        <Icon name="camera" color={'#FFF'} size={24} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }} >
                            <View style={{ position: 'absolute', bottom: 92, right: 16, width: 40, height: 40, backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 90 }}>
                                <TouchableOpacity style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={this.handleCoverPicButton}>
                                    <Icon name="camera" color={'#FFF'} size={24} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, borderRadius: 0, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                            <Text style={{ fontSize: 18, color: '#FFF' }}>{this.state.usuario.nome}</Text>
                            <Text style={{ fontSize: 14, color: '#FFF' }}>@{this.state.usuario.usuario}</Text>
                        </View>

                    </ImageBackground>
                </View>
            </View>
        )
    }
}

export default Configurar;