var express = require('express');
var router = express.Router();
var auth = require('../auth')();
var Bleep = require('../models/bleep');
var Usuario = require('../models/usuario');

/* Busca todos os Posts */
router.get('/', (req, res, next) => {
  Bleep.find({})
    .populate({ path: 'autor', select: 'nome + usuario' })
    .exec((error, posts) => {
      res.json(posts);
    });
});

router.get('/busca', (req, res, next) => {

  var string = '' + req.query.string.toLowerCase() || '';

  Bleep.find({
    '$or': [
      {
        texto: { '$regex': string, '$options': 'i' }
      },
    ]
  })
    .populate({ path: 'autor', select: 'nome + usuario' })
    .exec((error, bleeps) => {
      if (string === '') {
        res.json(bleeps.slice(0, 5));
      } else {
        res.json(bleeps);
      }
    });

});

/* Busca 1 item pelo id */
router.get('/:id', (req, res, next) => {
  Bleep.findById(req.params.id)
    .populate({ path: 'autor', select: 'nome + usuario' })
    .populate({ path: 'super' })
    .exec((error, post) => {

      if (post) {

        Usuario.populate(post,
          {
            path: 'super.autor',
            select: 'nome + usuario'
          }, (error, postPop) => {

            Bleep.find({ super: postPop._id })
              .populate({ path: 'autor', select: 'nome + usuario' })
              .exec((error, replies) => {

                console.log(replies)

                postPop.replies = replies;

                res.json(postPop);

              });

          });
      } else {
        res.status(400).send(error);
      }

    });
});

router.get('/:id/replies', (req, res, next) => {

  Bleep.find({ super: req.params.id })
    .populate({ path: 'autor', select: 'nome + usuario' })
    .populate({ path: 'super' })
    .exec((error, replies) => {

      Usuario.populate(replies,
        { path: 'super.autor', select: 'nome + usuario' },
        (error, repliesPop) => {
          res.json(repliesPop);
        }
      );

    });
});

/* Busca 1 item pelo id */
router.get('/usuario/:id/:page', (req, res, next) => {
  console.log(req.params.id);
  Bleep.find({ autor: req.params.id })
    .sort([['data', -1]])
    .skip((req.params.page - 1) * 10)
    .limit(10)
    .populate({ path: 'autor', select: 'nome + usuario' })
    .exec((error, posts) => {
      res.json(posts);
    });
});

/* Adiciona um comentario ao post _id*/
router.post('/:id/reply', auth.authenticate(), (req, res, next) => {
  new Bleep({ super: req.params.id, autor: req.user.payload._id, texto: req.body.texto, data: new Date() })
    .save((error, bleep) => {
      if (error) {
        res.status(400).send('Deu ruim');
      } else {
        res.json(bleep);
      }
    });
});

/* Adiciona um novo Bleep */
router.post('/', auth.authenticate(), function (req, res, next) {
  new Bleep({
    texto: req.body.texto,
    autor: req.user.payload._id,
    data: new Date()
  }).save((error, post) => {
    if (error) {
      res.json(error);
    } else {
      res.json(post);
    }
  })
});

router.delete('/:id', (req, res, next) => {
  Bleep.findByIdAndRemove(req.params.id, (error) => {
    res.send(error);
  });
});

router.delete('/:id/comment/:index', (req, res, next) => {
  // Post.findByIdAndRemove(req.params.id, (error) => {
  //   res.send(error);
  // });
});

router.delete('/', (req, res, next) => {
  Bleep.deleteMany({}, (error) => {
    if (error)
      res.send(error);
    else
      res.send('deletou')
  });
})


module.exports = router;
