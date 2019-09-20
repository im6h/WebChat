const sessionParser = require('../../shareds/sessionParser');
const userModel = require('../../models/user');
module.exports = function(req, socket, mapping, done) {
	sessionParser(req, {}, async () => {
		const passport = req.session.passport || {};
		if (passport.user) {
			const id = passport.user;
			const user = await userModel.findById(id).lean();
			if (user) {
				mapping.user = user;
				done();
			} else {
				done('not found');
			}
		} else {
			done('not auth');
		}
	});
};
