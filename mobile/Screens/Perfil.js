import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, StatusBar } from 'react-native';
import Axios from 'axios';
import Bleep from '../Components/Bleep';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { config } from '../Services';

const styles = StyleSheet.create({

});

export default class Perfil extends Component {

    state = {
        posts: [],
        usuario: {

        },
        refreshing: false,
        fetching: false,
        page: 1,
        yScroll: 0
    }

    componentDidMount() {
        if (!this.props.navigation.getParam('usuario')) {
            this.props.navigation.pop();
        }
        this.setState({ fetching: true })
        this.fetchPerfil();
        this.fetchBleeps(() => { this.setState({ fetching: false }) });
    };

    fetchPerfil = () => {

        var _id = this.props.navigation.getParam('usuario')._id,
            usuario = this.props.navigation.getParam('usuario').usuario;


        Axios.get(`${config.api.baseUrl}/api/usuario/${_id}`,
            { headers: { 'content-type': 'application/json' } })
            .then(res => {
                this.setState({ usuario: res.data });
            })
            .catch(error => {
                alert(error);
            });


    };

    fetchBleeps = (done) => {

        var _id = this.props.navigation.getParam('usuario')._id;

        Axios.get(`${config.api.baseUrl}/api/bleep/usuario/${_id}/${this.state.page}`)
            .then(res => {
                if (res.data.length > 0) {
                    var dados = this.state.posts;
                    dados = dados.concat(res.data);
                    this.setState({ posts: dados, page: this.state.page + 1 });
                }
                if (done) {
                    return done();
                }
            })
            .catch(error => {
                alert(error);
            });

    }

    refresh = () => {
        this.setState({ refreshing: true, page: 1, posts: [] }, () => {
            this.fetchBleeps(() => {
                this.setState({ refreshing: false })
            });

        });
    }

    handleBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF', position: 'relative' }}>
                {/* <Toolbar leftIcon={'close'} leftAction={() => { this.props.navigation.pop() }} title={"Perfil"} {...this.props} /> */}
                <View style={{ position: 'absolute', zIndex: 1500, left: 0, top: 0, right: 0, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.yScroll > 200 ? config.theme.colors.main : 'transparent' }}>
                    <View style={{ width: 56, borderRadius: 90, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={this.handleBack}
                            style={{ backgroundColor: 'rgba(0,0,0,0.1)', alignItems: 'center', justifyContent: 'center', height: 40, width: 40, borderRadius: 90 }}>
                            <Icon name={'chevron-left'} size={32} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        {this.state.yScroll > 200 &&
                            <>
                                <StatusBar backgroundColor={config.theme.colors.darker} />
                                <Text style={{ fontSize: 16, color: '#fff' }}>{this.state.usuario.nome}</Text>
                                <Text style={{ fontSize: 12, color: '#fff' }}>@{this.state.usuario.usuario}</Text>
                            </>
                        }
                    </View>
                </View>
                <FlatList
                    onScroll={this.handleOnScroll}
                    persistentScrollbar
                    ref={(view) => { this.listView = view }}
                    onRefresh={this.refresh}
                    refreshing={this.state.refreshing}
                    data={this.state.posts}
                    renderItem={({ item, index }) =>
                        <Bleep
                            replied={item.super ? true : false}
                            id={item._id}
                            nome={item.autor.nome}
                            usuario={item.autor.usuario}
                            texto={item.texto}
                            data={new Date(item.data).toLocaleDateString()}
                            {...this.props}
                        />
                    }
                    keyExtractor={item => item._id}
                    onEndReached={(dist) => { this.setState({ fetching: true }); this.fetchBleeps(() => { this.setState({ fetching: false }) }) }}
                    ListHeaderComponent={this.headerComponent()}
                    ListFooterComponent={this.footerComponent()}
                    ListEmptyComponent={this.ListEmptyComponent()}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={15}
                />
                {
                    this.state.x !== null &&
                    <View style={{ position: 'absolute', backgroundColor: 'red' }}>
                        <Text>
                            {this.state.y}
                        </Text>
                    </View>
                }
            </View >
        );
    }

    handleOnScroll = event => {
        this.setState({ yScroll: event.nativeEvent.contentOffset.y });
    }

    headerComponent = () => (
        <View style={{ height: 201, borderBottomWidth: 1, borderBottomColor: '#DDD', position: 'relative' }}>
            <View style={{ height: 100, backgroundColor: config.theme.colors.main }} >
                <View style={{ position: 'absolute', left: 16, bottom: -40, height: 80, width: 80, backgroundColor: '#000', borderRadius: 90, borderWidth: 4, borderColor: '#FFF' }} />
            </View>
            <View style={{ height: 100, backgroundColor: '#FFF' }} >
                <View style={{ position: 'absolute', left: 16, top: -40, height: 80, width: 80, backgroundColor: '#000', borderRadius: 90, borderWidth: 4, borderColor: '#FFF' }} />
                <View style={{ position: 'absolute', top: 8, right: 16, height: 30, backgroundColor: '#FFF', borderRadius: 0, flexDirection: 'row-reverse' }}>
                    <TouchableOpacity style={{ height: 30, backgroundColor: config.theme.colors.main, borderRadius: 90, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 16, textAlignVertical: 'center' }}>Seguir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 30, borderColor: config.theme.colors.main, borderWidth: 1, borderRadius: 90, padding: 5, justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
                        <Icon name={'email-outline'} size={18} color={config.theme.colors.main} />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'absolute', left: 16, right: 16, bottom: 16, borderRadius: 0 }}>
                    <Text style={{ fontSize: 18 }}>{this.state.usuario.nome}</Text>
                    <Text style={{ fontSize: 14 }}>@{this.state.usuario.usuario}</Text>
                </View>
            </View>
        </View>
    )

    footerComponent = () => (
        <View style={{ padding: 12, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#DDD' }}>
            <ActivityIndicator style={{ backgroundColor: '#666', borderRadius: 90, width: 8, height: 8 }} size={'small'} color={config.theme.colors.darker} hidesWhenStopped animating={this.state.fetching} />
        </View>

    )

    ListEmptyComponent = () => (
        <View style={{ height: 64, alignItems: 'center', justifyContent: "center" }}>
            <Text style={{ color: '#888' }}>
                @{this.state.usuario.usuario} não bleepou ainda.
            </Text>
        </View>
    )
}
