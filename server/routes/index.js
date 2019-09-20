const express = require('express');
const router = express.Router();
/*User CORS*/
router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

/* GET home page. */
router.get('/', function (req, res, next) {
	res.send({ title: 'Express' });
});
router.use('/user', require('./user'));
router.use('/room', require('./room'));
router.use('/message', require('./message'));
router.use('/file', require('./file'));
router.use('/group', require('./group'));
module.exports = router;
