const { validationResult } = require('express-validator');
const status = require('http-status');
module.exports = function(req, res, next) {
	const error = validationResult(req);
	if (error.isEmpty()) return next();
	return res.status(status.FORBIDDEN).send(error.array({ onlyFirstError: true }));
};
