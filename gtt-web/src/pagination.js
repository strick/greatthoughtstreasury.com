const db = require('./db');
const mongoose = require('mongoose');

module.exports = {

    // Need to refactor, but used this for two populate objtse
    paginate2: function(req, res, next, model, viewObj, viewScript, resultsKey, populateObj, populateObj2, perPage, page, findQuery){

        //db.connect();

        var perPage = perPage || 50;
        var page = req.params.page || page || 1;
        var findQuery = findQuery || {};

        model.find(findQuery)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate(populateObj)
            .populate(populateObj2)
            .exec(function (err, results) {

            if (err){
                //console.log(err)
                //throw Exception(err);
                //db.close();
                return next(err);
            }

            if(results == null){
                //db.close();
                //controllerObj.res.status(404).send();
                res.status(500).send();
                return next();
            }
                

            model.countDocuments(findQuery).exec((err,count)=>{       
                
                //db.close();

                viewObj.current = page;
                viewObj.pages = Math.ceil(count / perPage)
                viewObj[resultsKey] = results;

                res.render(viewScript, viewObj, function(err, html){
                    if(err) {
                        //db.close();
                        next(err);
                    }
                });
            });
        });
    },

    paginate: function(req, res, next, model, viewObj, viewScript, resultsKey, populateObj, perPage, page, findQuery){

        var perPage = perPage || 50;
        var page = req.params.page || page || 1;
        var findQuery = findQuery || {};

        //console.log(model);
        model.find(findQuery)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .populate(populateObj)
            .exec(function (err, results) {

                //console.log("fond");
            if (err){
                //db.close();
                next(err); 
            }    
            
            if(results == null){
                //db.close();
                //controllerObj.res.status(404).send();
                res.status(404);
                return next();
            }

            model.countDocuments(findQuery).exec((err,count)=>{       
                        
             //   console.log("counting");
                if (err){
                    //db.close();
                    next(err); 
                } 
                //db.close();

                viewObj.current = page;
                viewObj.pages = Math.ceil(count / perPage)
                viewObj[resultsKey] = results;

                res.render(viewScript, viewObj, function(err, html){
                    if(err) {
                        //db.close();
                        next(err);
                    }
                    res.send(html);
                });
            });
        });
    },

    paginateSingle: function(controllerObj, findQuery){
       
        //db.connect();

        var findQuery = findQuery || {_id: controllerObj.req.params.id};

        // Set default paging settings
        var perPage = controllerObj.perPage || 50;
        var page = controllerObj.req.params.page || controllerObj.page || 1;

        // Set the limits to the related model to display.
        controllerObj.populate.limit = perPage;
        controllerObj.populate.skip = (perPage * page) - perPage;

        // Grab the prmimary model and populate with the initial limits of the related model
        controllerObj.model.findOne(findQuery).
  
            populate(controllerObj.populate)
            .exec(function (err, results) {
            if (err){
               // console.log(err);
                if(err instanceof mongoose.Error.CastError){
                    //db.close();
                    //controllerObj.res.status(404).send();
                    controllerObj.res.status(404);
                    return controllerObj.next();
                }
                return controllerObj.next(err);
            }

            // If the result is null, then author doesn't exist
            if(results == null){
                //db.close();
                //controllerObj.res.status(404).send();
                controllerObj.res.status(404);
                return controllerObj.next();
            }
                
            let relatedModelObj = {};
            relatedModelObj[controllerObj.relateModelField] = results._id;
 
            // Get the full count of related docuuments to enable paging to walk over all of them
            controllerObj.relateModel.countDocuments(relatedModelObj).
            exec((err, count) => {
  
                /// Set the current page information
                controllerObj.viewObj.current = page;
                controllerObj.viewObj.pages = Math.ceil(count / perPage);
                controllerObj.viewObj[controllerObj.resultsKey] = results;
    
                controllerObj.res.render(controllerObj.viewScript, controllerObj.viewObj, function(err, html){

                    if(err) {
                        //db.close();
                        next(err);
                    }
                });

                //db.close();
            });
            
        });
    },

    paginateSingleNoPopulate: function(controllerObj, findQuery){
       
        //db.connect();

        var findQuery = findQuery || {_id: controllerObj.req.params.id};

        // Set default paging settings
        var perPage = controllerObj.perPage || 50;
        var page = controllerObj.req.params.page || controllerObj.page || 1;

        // Set the limits to the related model to display.
        controllerObj.populate.limit = perPage;
        controllerObj.populate.skip = (perPage * page) - perPage;

        // Grab the prmimary model and populate with the initial limits of the related model
        controllerObj.model.findOne(findQuery).
  
            populate(controllerObj.populate)
            .exec(function (err, results) {
            if (err){
                //db.close();
                return controllerObj.next(err);
            }

                
            let relatedModelObj = {};
            relatedModelObj[controllerObj.relateModelField] = results._id;
 
            // Get the full count of related docuuments to enable paging to walk over all of them
            controllerObj.relateModel.countDocuments(relatedModelObj).
            exec((err, count) => {
  
                /// Set the current page information
                controllerObj.viewObj.current = page;
                controllerObj.viewObj.pages = Math.ceil(count / perPage);
                controllerObj.viewObj[controllerObj.resultsKey] = results;
    
                controllerObj.res.render(controllerObj.viewScript, controllerObj.viewObj, function(err, html){
                    if(err) {
                        //db.close();
                        next(err);
                    }
                });

                //db.close();
            });
            
        });
    }
}
