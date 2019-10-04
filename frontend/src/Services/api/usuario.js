import axios from "axios";
import { api } from '../../config';

export default {
    getToken: usuario => {
        return axios.post(api.requestToken,
            {
                usuario: usuario.usuario,
                senha: usuario.senha
            }
        );
    }
}