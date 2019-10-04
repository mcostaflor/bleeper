import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { login, logout } from '../Services/actions/usuario.action';
import './LeftMenu.css';
import axios from 'axios';

class Home extends Component {

    state = {
        bleep: false
    }

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.container}>
                {this.props.usuario && this.props.usuario.nome ?
                    <div>
                        {this.props.usuario.nome}
                        <br />
                        @{this.props.usuario.usuario}
                        <br />
                        <br />
                        $0 bleeps
                        <br />
                        <br />
                        Início
                        <br />
                        Perfil
                        <br />
                        Notificações
                        <br />
                        Mensagens
                        <br />
                        <br />
                        <a onClick={() => { this.toggleBleep() }}>
                            Bleepar
                        </a>
                    </div>
                    :
                    <div>
                        <button>conectar</button>
                        <div>
                            <input id={'username-input'} ></input>
                        </div>
                        <div>
                            <input id={'senha-input'}></input>
                        </div>
                        <button onClick={() => { this.handleLogin() }}>entrar</button>
                        <button onClick={() => { this.handleLogout() }}>sair</button>
                    </div>
                }
            </div>
        );
    }

    toggleBleep = () => {
        this.setState({ bleep: !this.state.bleep });
    }

    handleLogin = () => {

        var usuario = document.getElementById('username-input').value
        var senha = document.getElementById('senha-input').value

        axios.post('/usuario/token/', { usuario, senha })
            .then(res => {
                console.log(res);
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('usuario', res.data.usuario);
                    this.props.dispatch(login(res.data.usuario, res.data.token));
                }
            })
            .catch(error => console.log(error))
    }

    handleLogout = () => {

        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        this.props.dispatch(logout());
    }

}

Home.defaultProps = {
    usuario: {}
}

const styles = theme => ({
    container: {
        padding: 8,
        borderRadius: 8,
        display: 'inline-block',
        textAlign: 'right'
    }
});

const mapStateToProps = state => ({
    usuario: state.usuario.usuario
});

export default connect(mapStateToProps)(withStyles(styles)(Home));
