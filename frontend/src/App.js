import React from 'react';
import axios from 'axios';
import { api } from './config';
import { connect } from 'react-redux';
import { login, logout } from './Services/actions/usuario.action';
import Home from './Scenes/Home';

class App extends React.Component {

  componentDidMount() {
    axios.defaults.baseURL = api.url;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.timeout = 2500;
    axios.interceptors.response.use((res) => { console.log(res.status); return res; }, (error, res) => { if (error.response.status === '401') { this.handleLogout() }; return Promise.reject(error); })
    var token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.authorization = 'Bearer ' + token;
      axios.get('/usuario')
        .then(res => {
          localStorage.setItem('usuario', JSON.stringify(res.data))
          this.props.dispatch(login(JSON.parse(localStorage.getItem('usuario')), token));
        })
        .catch(error => {
          this.props.dispatch(logout());
        })
    }
  }

  render() {

    return (
      <div>
        <Home />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  usuario: state.usuario
});

export default connect(mapStateToProps)(App);
