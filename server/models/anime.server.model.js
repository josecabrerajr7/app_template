var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AnimeSchema = new Schema({
	name: 		String,
	file: 		Object,
	story: 		String, 		
	language: 	String,
	length: 	Number
});

module.exports = mongoose.model('Anime', AnimeSchema);