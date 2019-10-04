import React, { Component } from 'react';
import { connect } from 'react-redux';
import bleepApi from '../Services/api/bleep';
import Bleep from '../Components/Bleep';
import Axios from 'axios';

class Bleeps extends Component {

    state = {
        bleeps: []
    }

    componentDidMount() {
        bleepApi.getAllBleeps()
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({ bleeps: res.data })
                    console.log(res.data);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    handlePostButton = () => {

        var texto = document.getElementById('novo-bleep-textarea').value;

        Axios.post('/bleep/', { texto   })
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div style={{ padding: 8 }}>
                <div style={{ marginBottom: 8 }}>
                    <div>
                        <textarea id="novo-bleep-textarea" placeholder={'Novo Bleep'} style={{ resize: 'none', width: '100%', borderRadius: 5, fontSize: 19, boxSizing: 'border-box', fontFamily: 'Roboto' }} wrap={"hard"} rows={5} columns={10} />
                    </div>
                    <div style={{ display: "flex", flexDirection: 'row-reverse' }}>
                        <button onClick={() => { this.handlePostButton() }}>Enviar</button>
                    </div>
                </div>
                {this.state.bleeps &&
                    this.state.bleeps.map((item, index) =>
                        <Bleep
                            key={index}
                            nome={item.autor.nome}
                            usuario={item.autor.usuario}
                            texto={item.texto}
                            data={item.data}
                        />
                    )
                }
            </div>
        );
    }
}
const mapStateToProps = state => ({
    usuario: state.usuario
});

export default connect(mapStateToProps)(Bleeps);
