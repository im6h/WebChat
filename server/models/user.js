const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true
		},
		fullName: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		hashPassword: {
			type: String,
			required: true,
		},
		lastOnline: {
			type: Date,
			default: () => new Date(),
		},
	},
	{
		timestamps: true,
	},
);
/**
 * compare raw password with its hash
 * @param password
 */
schema.methods.isValidPassword = function(password) {
	return bcrypt.compareSync(password, this.hashPassword);
};
schema.statics.hashPassword = function(password) {
	return bcrypt.hashSync(password, 5);
};
schema.statics.findByUsername = function(username, projector = {}) {
	return this.findOne({ username }, projector);
};
module.exports = mongoose.model('user', schema);
