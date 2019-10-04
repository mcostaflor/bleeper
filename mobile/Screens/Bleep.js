import React, { Component } from 'react';
import Toolbar from '../Components/Toolbar';
import BleepMain from '../Components/BleepMain';
import BleepReplied from '../Components/BleepReplied';
import BleepReply from '../Components/BleepReply';
import { View, StyleSheet, Text, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { config } from '../Services';

import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({

});

export default class Bleep extends Component {

    state = {
        fetching: true
    }

    componentDidMount() {
        alert(this.props.navigation.getParam('id'))
        this.fetchData();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.fetchData();
        });
    }

    fetchData = () => {
        this.setState({ fetching: true });
        Axios.get(`${config.api.baseUrl}/api/bleep/${this.props.navigation.getParam('id')}`)
            .then(res => {
                if (res.data) {
                    this.setState({ data: res.data, super: res.data.super ? res.data.super : null, fetching: false });
                    Axios.get(`${config.api.baseUrl}/api/bleep/${this.props.navigation.getParam('id')}/replies`)
                        .then(res => {
                            if (res.data.length > 0)
                                this.setState({ replies: res.data })
                        })
                        .catch(error => {
                            alert(error);
                        })

                }

            })
            .catch(error => {
                this.setState({ fetching: false });
                alert(error);
            })
    }

    refresh = () => {
        this.setState({ refreshing: true });
        setTimeout(
            () => { this.setState({ refreshing: false }) }, 3000
        )
    }

    render() {
        return (
            <ScrollView style={{ minHeight: '100%' }} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}>
                <Toolbar
                    leftIcon={'chevron-left'}
                    leftAction={() => { if (this.props.navigation.getParam('back')) { this.props.navigation.navigate(this.props.navigation.getParam('back')) } else { this.props.navigation.goBack() } }}
                    title={!this.state.data ? 'Bleeper' : this.state.data.autor.usuario}
                    {...this.props}
                    rightIcon={'reply'}
                    rightAction={() => { if (this.state.data) this.props.navigation.navigate('NovoBleep', { bleep: this.state.data }) }}
                />
                {this.state.super &&
                    <BleepReplied
                        key={this.state.super._id}
                        id={this.state.super._id}
                        texto={this.state.super.texto}
                        usuario={this.state.super.autor.usuario}
                        nome={this.state.super.autor.nome}
                        data={new Date(this.state.super.data).toLocaleDateString()}
                        {...this.props}
                    />
                }
                <ScrollView style={styles.container}>
                    {this.state.data ?
                        <BleepMain
                            key={this.state.data._id}
                            id={this.state.data._id}
                            texto={this.state.data.texto}
                            autor={this.state.data.autor}
                            usuario={this.state.data.autor.usuario}
                            nome={this.state.data.autor.nome}
                            data={new Date(this.state.data.data).toLocaleDateString()}
                            {...this.props}
                        />
                        :
                        <Text>
                            Carregando
                    </Text>
                    }
                </ScrollView>
                {this.state.replies &&
                    <ScrollView style={{ backgroundColor: '#EEE' }}>
                        {this.state.replies.map((item, index) =>
                            <BleepReply
                                key={item._id}
                                id={item._id}
                                texto={item.texto}
                                usuario={item.autor.usuario}
                                nome={item.autor.nome}
                                data={new Date(item.data).toLocaleDateString()}
                                super={item.super}
                                {...this.props}
                            />
                        )}
                    </ScrollView>
                }
            </ScrollView>
        );
    }
}
