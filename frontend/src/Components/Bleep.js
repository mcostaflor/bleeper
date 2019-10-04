import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

class Bleep extends Component {
    render() {

        const { classes } = this.props;

        return (

            <div className={classes.container}>
                <div className={classes.cabecalho}>
                    <div className={classes.nome}>
                        {this.props.nome}
                    </div>
                    <div className={classes.usuario}>
                        @{this.props.usuario}
                    </div>
                    <div className={classes.data}>
                        {new Date(this.props.data).toLocaleDateString()}
                    </div>
                </div>
                <div className={classes.corpo}>
                    <div className={classes.texto}>
                        {this.props.texto}
                    </div>
                </div>
                <div className={classes.rodape}>
                    <div className={classes.replies}>
                        $0 respostas
                    </div>
                    <div className={classes.likes}>
                        $0 curtidas
                    </div>
                </div>
            </div>

        );

    }
}

Bleep.defaultProps = {
    nome: '',
    usuario: '',
    texto: ''
}

const styles = theme => ({
    container: {
        width: 400,
        backgroundColor: '#EEE',
        marginBottom: 8,
        borderRadius: 10
    },
    cabecalho: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: '0px 0px 1px 0px',
        borderStyle: 'solid',
        borderColor: '#DDD',
        padding: 8
    },
    corpo: {
        padding: 16,
        textAlign: 'justify '
    },
    rodape: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: '1px 0px 0px 0px',
        borderStyle: 'solid',
        borderColor: '#DDD',
        padding: 8
    },
    nome: {
        color: '#444',
        marginRight: 8
    },
    usuario: {
        color: '#999',
        marginRight: 8
    },
    data: {
        color: '#999',
        fontSize: 12,
        flex: 1,
        textAlign: 'right'
    },
    texto: {
        paddingTop: 8
    },
    actions: {
        display: 'flex', flexDirection: 'row', alignItems: 'flex-start',
        fontSize: 14,
        marginTop: 8
    },
    replies: {
        marginRight: 8,
    },
    likes: {

    }
});

export default withStyles(styles)(Bleep);
