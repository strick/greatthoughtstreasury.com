var express = require('express');
var controller = require('../controllers/author');
var router = express.Router();


router.route('/').get(controller.listAll);


router.get('/:id', function(req, res, next) {

  let id = req.params.id;

  let author = authors.find(author => author.id == id);

  res.render('authors/single', { 
    title: 'Author',
    author: author
  });
});

module.exports = router;
