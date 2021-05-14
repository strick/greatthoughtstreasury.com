const db = require('./db');

module.exports = {

    paginate: function(req, res, model, viewObj, viewScript, resultsKey, perPage, page){

        db.connect();

        var perPage = perPage || 25;
        var page = req.params.page || page || 1;

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
    },

    paginateSingle: function(controllerObj){
       
        db.connect();

        // Set default paging settings
        var perPage = controllerObj.perPage || 10;
        var page = controllerObj.req.params.page || controllerObj.page || 1;

        // Set the limits to the related model to display.
        controllerObj.populate.limit = perPage;
        controllerObj.populate.skip = (perPage * page) - perPage;

        // Grab the prmimary model and populate with the initial limits of the related model
        controllerObj.model.findOne({_id: controllerObj.req.params.id}).
  
            populate(controllerObj.populate)
            .exec(function (err, results) {
            if (err)
                return controllerObj.next(err);

                
            let relatedModelObj = {};
            relatedModelObj["keywords"] = results._id;
 
            // Get the full count of related docuuments to enable paging to walk over all of them
            controllerObj.relateModel.countDocuments(relatedModelObj).
            exec((err, count) => {
  
                /// Set the current page information
                controllerObj.viewObj.current = page;
                controllerObj.viewObj.pages = Math.ceil(count / perPage);
                controllerObj.viewObj[controllerObj.resultsKey] = results;
    
                controllerObj.res.render(controllerObj.viewScript, controllerObj.viewObj);

                db.close();
            });
            
        });

    }
}
