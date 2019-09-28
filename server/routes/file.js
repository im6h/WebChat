const router = require('express').Router();
const mustAuth = require('../middlewares/must-auth');
const multer = require('multer');
const fileModel = require('../models/file');
const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, 'uploads/'),
	filename: function(req, file, cb) {
		const name = req.user.username + '-' + Date.now() + '-' + file.originalname;
		cb(null, name);
	},
});
const upload = multer({
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
	storage,
});
// send file 
router.post('/', upload.single('file'), mustAuth, async (req, res) => {
	const file = req.file;
	const record = await fileModel.create({ ...file, uploader: req.user._id });
	return res.send(record._id);
});
module.exports = router;
