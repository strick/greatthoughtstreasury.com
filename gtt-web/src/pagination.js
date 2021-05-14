const db = require('./db');

module.exports = {

    paginate: function(perPage, page, res, model, viewObj, viewScript, resultsKey){

        db.connect();

        model.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, results) {

            if (err)
                return next(err);            

            model.countDocuments({}).exec((err,count)=>{       
                
                db.close();

                viewObj.current = page;
                viewObj.pages = Math.ceil(count / perPage)
                viewObj[resultsKey] = results;

                res.render(viewScript, viewObj);
            });
        });
    }
}