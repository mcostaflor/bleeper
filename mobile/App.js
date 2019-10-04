import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Home, Login, Cadastrar, Esqueceu, Perfil, Bleep, NovoBleep } from './Screens';
import Buscar from './Screens/Buscar';
import MainDrawer from './Components/MainDrawer';
import { Provider } from 'react-redux';

const HomeContainer = createStackNavigator({
  Home: Home,
}, {
  headerMode: "none"
});
const LoginContainer = createStackNavigator({
  Login: Login,
  Cadastrar: Cadastrar,
  Esqueceu: Esqueceu
}, {
  headerMode: 'none'
});


const App = createAppContainer(

  createStackNavigator({

    App: createDrawerNavigator({
      Início: HomeContainer,
    }, {
      drawerWidth: 300,
      drawerPosition: 'left',
      initialRouteName: 'Início',
      drawerType: 'slide',
      contentComponent: MainDrawer,
      backBehavior: 'none',
      headerMode: 'none',
      navigationOptions: {
        header: null
      }
    }),
    Bleep: {
      screen: Bleep,
      navigationOptions: {
        header: null
      }
    },
    NovoBleep: {
      screen: NovoBleep,
      navigationOptions: {
        header: null
      }
    },
    Usuario: {
      screen: Perfil,
      navigationOptions: {
        header: null
      }
    },
    Buscar: {
      screen: Buscar,
      navigationOptions: {
        header: null
      }
    },
    Entrar: {
      screen: LoginContainer,
      navigationOptions: {
        header: null
      }
    },
    Configurar: {
      screen: Configurar,
      navigationOptions: {
        header: null
      }
    }
  })

);

import Store from './Store';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Configurar from './Screens/Configurar';

export default class Application extends Component {
  render() {
    return (
      <Provider store={Store}><App /></Provider>
    )
  }
}
