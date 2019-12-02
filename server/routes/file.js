const router = require('express').Router();
const mustAuth = require('../middlewares/must-auth');
const multer = require('multer');
const gridStorage = require('../models/gridfs').storage;
const getFileModel = require('../models/gridfs').getStreamCollection;
const upload = multer({
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
	storage: gridStorage,
});
// send file
router.post('/', upload.single('file'), mustAuth, async (req, res) => {
	const file = req.file;
	return res.send(file.id);
});
router.get('/:id', mustAuth, async function(req, res) {
	const record = await getFileModel().files.findById(req.params.id);
	if (!record || record.length === 0) return res.status(404).end();
	const readStream = getFileModel().createReadStream({ _id: record._id });
	readStream.pipe(res);
});
module.exports = router;
