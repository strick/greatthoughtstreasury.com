var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var authors = [
    {
      firstName: "Bob",
      lastName: "White",
      birth: "1999",
      death: "1993",
      bio: "This is a bio"
    },
    {
      firstName: "Bob232",
      lastName: "White",
      birth: "1999",
      death: "1993",
      bio: "This is a biodddd"
    },
  ];

  res.render('authors/index', { 
    title: 'Author Listing',
    authors: authors
  });
});

module.exports = router;
