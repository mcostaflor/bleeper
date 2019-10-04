import usuarioReducer from './Services/reducers/usuario.reducer';
import { combineReducers } from 'redux';
import { createStore } from 'redux';

export default createStore(combineReducers({
    usuario: usuarioReducer
}))
