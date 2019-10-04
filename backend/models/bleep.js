var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bleepSchema = new Schema({
    texto: { type: String, require: true, maxlength: 140 },
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    data: { type: Date, required: true, default: Date.now },
    super: { type: Schema.Types.ObjectId, ref: 'Bleep' }
});

module.exports = mongoose.model('Bleep', bleepSchema);