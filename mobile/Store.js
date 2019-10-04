import { createStore, combineReducers } from 'redux';

import UsuarioReducer from './Services/usuario/usuario.reducer';

var store = createStore(combineReducers({
    usuario: UsuarioReducer
}));
export default store;