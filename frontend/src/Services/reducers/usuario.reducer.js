import { types } from '../actions/usuario.action';

export default (state = {}, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                usuario: action.payload.usuario,
                token: action.payload.token,
            }
        case types.LOGOUT:
            return {
                usuario: null,
                token: null
            }
        default:
            return {
                state
            }
    }
}