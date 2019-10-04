import axios from "axios";
import { api } from '../../config';

export default {
    getAllBleeps: () => {
        return axios.get(api.fetchAll);
    },
    postBleep: (texto) => {
        return axios.post(api.postBleep, { texto });
    }
}