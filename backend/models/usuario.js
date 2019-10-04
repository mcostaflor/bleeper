var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nome: String,
    usuario: String,
    senha: String,
    email: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);