var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/surface', function(req, res, next){
  res.render('surfaceCalculator');
});

router.get('/coordinates', (req, res, next) =>{

  axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyBF29yHsrVzGWjLXQ48C_XFnXSd1t6ABFU&input='+encodeURI(req.query.address)+'&inputtype=textquery&fields=geometry')
    .then((data) =>{
      console.log(req.query.address);
      console.log(data.data);
      res.json(data.data.candidates[0].geometry.location);

    })
    .catch( (err) =>{
      console.log(err);
      res.json(err);
    })


});

module.exports = router;
