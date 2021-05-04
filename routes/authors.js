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

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('authors/index', { 
    title: 'Author Listing',
    authors: authors
  });
});

module.exports = router;
