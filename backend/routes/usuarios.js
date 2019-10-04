var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');
var cfg = require("../config.js");
var jwt = require('jwt-simple');
var auth = require('../auth')();

router.get('/', auth.authenticate(), (req, res, next) => {
  res.json(req.user.payload)
});

router.get('/busca', (req, res, next) => {

  var string = '' + req.query.string.toLowerCase() || '';

  Usuario.find({
    '$or': [
      {
        usuario: { '$regex': string, '$options': 'i' }
      },
      {
        nome: { '$regex': string, '$options': 'i' }
      },
    ]
  })
    .exec((error, usuarios) => {
      if (string === '') {
        res.json(usuarios.slice(0, 5));
      } else {
        res.json(usuarios);
      }
    });

});

router.get('/:id', (req, res, next) => {
  Usuario.findById(req.params.id, (error, usuario) => {
    if (error) {
      res.status(400).json(error);
    } else {
      res.status(200).json(usuario);
    }
  });
});


router.post('/esqueceu', function (req, res, next) {
  Usuario.findOne({ usuario: req.body.usuario, email: req.body.email }, (error, usuario) => {

    if (error) {
      res.json(error);
    } else {
      res.json(usuario);
    }
  });
});

router.post('/registro', function (req, res, next) {
  console.log(req.body);
  var newUsuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    usuario: req.body.usuario,
    senha: req.body.senha
  });
  newUsuario.save({}, (usuario, error) => {
    if (error) {
      res.send(error);
    } else {
      res.json(usuario);
    }
  });
});

router.post('/token', function (req, res, next) {
  const { usuario, senha } = req.body;
  if (usuario && senha) {
    Usuario.findOne({ usuario, senha }, (error, usuario) => {
      if (error) {
        res.json(error);
      } else if (usuario) {
        var payload = usuario;
        var token = jwt.encode(payload, cfg.jwtSecret);
        return res.json({ usuario, token });
      } else if (!usuario) {
        res.json({ status: 404, mensagem: 'Não foi encontrado um usuário com as credenciais inseridas.' })
      } else {
        res.status(400).send('Erro desconhecido. Verifique suas credenciais e tente novamente.')
      }
    });
  } else {
    res.json({})
  }

});

router.get('/listar', auth.authenticate(), function (req, res, next) {
  Usuario.find({}, (error, usuarios) => {
    if (error) {
      res.json({ status: 400 })
    } else {
      res.json(usuarios);
    }
  });
});

module.exports = router;
