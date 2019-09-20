const status = require('http-status');
module.exports = function(req, res, next) {
	console.log(req.session)
	if (req.user) {
		return next();
	}
	return res.status(status.UNAUTHORIZED).send({ message: 'Lỗi xác thực' });
};
