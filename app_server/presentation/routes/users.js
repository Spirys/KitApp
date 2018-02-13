var express = require('express');
var router = express.Router();

// TODO write user routes here (actually this might be an SPA page)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
