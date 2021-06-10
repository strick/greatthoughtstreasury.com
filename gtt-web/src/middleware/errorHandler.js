
const handleErrors = function(){

    return (err, req, res, next) => {

        console.error(err.stack);
        return res.status(500).send("Something Broke!");
  }
}
  
  
  module.exports = handleErrors;