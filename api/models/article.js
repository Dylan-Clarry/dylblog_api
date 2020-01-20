const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	title: { type: String, required: true },
	author: { type: String, required: true },
	content: { type: String, required: true },
	description: { type: String, required: false, default: "", },
});

module.exports = mongoose.model('Article', articleSchema);