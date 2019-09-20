const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user');
passport.use(
	new LocalStrategy(function(username, password, done) {
		userModel.findOne({ username }, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.isValidPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}),
);
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
	userModel
		.findById(id)
		.then(function(user) {
			done(null, user);
		})
		.catch(e => done(e));
});
module.exports = () => console.log('local strategy');
