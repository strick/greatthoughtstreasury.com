var express = require('express');
var router = express.Router();

var authors = [
  {
    id: 1,
    firstName: "Bob",
    lastName: "White",
    birth: "1999",
    death: "1993",
    bio: "This is a bio"
  },
  {
    id: 2,
    firstName: "Bob232",
    lastName: "White",
    birth: "1999",
    death: "1993",
    bio: "This is a biodddd"
  },
];

router.get('/', function(req, res, next) {

  res.render('authors/index', { 
    title: 'Author Listing',
    authors: authors
  });
});


router.get('/:id', function(req, res, next) {

  let id = req.params.id;

  let author = authors.find(author => author.id == id);

  res.render('authors/single', { 
    title: 'Author',
    author: author
  });
});

module.exports = router;
