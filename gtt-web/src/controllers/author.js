var Author = require('../models/Author');
var Quote = require('../models/Quote');
var db = require('../db');
const paginate = require('../pagination');

module.exports = {

    test: function(req, res, next) {
        db.connect();
         
        let authors = [
            { firstName: "ddddd", bio: "Rabbi of the Jewish Talmu", death: 339, image: "abaye[1].gif"},
            { firstName: "Fraffffncis", lastName: "Ellington", bio: "Abbot	Theologian, Unitarian Minister", birth: 1836, death: 1903},
            { firstName: "John", lastName: "Abbott, fully John Stevens Cabot Abbott", bio: "American Historian, Pastor and Pedagogical Writer", birth: 1805, death: 1877, image: "JohnStevens-CabotAbbott-68-s[1].jpg" }
          ];
      
          Author.insertMany(authors).
          then(() => {
            db.close();
             
            res.render('authors/index', { 
                title: 'Author Listing',
                authors: authors
            });
          });
            
    },
    
    listAll: function (req, res, next) {
 
        let viewObj = {
            title: 'Author Listing'
        }

        paginate.paginate(req, res, Author, viewObj, 'authors/index', 'authors');
    },

    listAllPage: function (req, res, next) {

        let viewObj = {
            title: 'Author Listing'
        }

        paginate.paginate(req, res, Author, viewObj, 'authors/index', 'authors');
    },

    getByNid: function (req, res, next) {
        db.connect();

        
        Author.findOne({_id: req.params.id}).
            populate({
                path: 'quotes',
                model: 'Quote'
            }).
            exec(function (err, author) {
            if (err)
                return next(err);
               
           // console.log(author);

           db.close();

            res.render('authors/single', { 
                title: 'Author',
                author: author
            });
        });
    }
}