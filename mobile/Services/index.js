import config from './config';
import usuarioActions from './usuario/usuario.actions';
import usuarioReducer from './usuario/usuario.reducer';

var actions = {
    usuario: usuarioActions
}

var reducers = {
    usuario: usuarioReducer
}

export {
    config,
    actions,
    reducers
}