var express 				= require('express'),
	app = module.exports	= express(),
	multer 					= require('multer');

// this function is going to help store the image in a folder
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg');
  }
});

var upload = multer({ storage: storage });




var Anime = require('../models/anime.server.model');

// Routes for the api
var router = express.Router();

//middleware to use for all requests
router.use(function(req, res, next) {
	console.log('It\'s working!');
	next();
});
router.route('/animes')
	.post(upload.single('file'), function(req, res) {
		
		var anime = new Anime();
			anime.name = req.body.name;
			anime.file = req.file;
			anime.story = req.body.story;
			anime.language = req.body.language;
			anime.length = req.body.length;

			anime.save(function(err) {
			if (err)
				res.send(err);
					res.json({ message: 'New Anime Created!' });
			});
	})
	.get(function(req, res) {
		Anime.find(function(err, animes) {
		if (err)
			res.send(err);
				res.json(animes);
		});
	});

	router.route('/animes/:anime_id')
		.get(function(req, res) {
			Anime.findById(req.params.anime_id, function(err, anime) {
			if (err)
				res.send(err);
					res.json(anime);
			});
		})
		.put(function(req, res) {
			Anime.findById(req.params.anime_id, function(err, anime) {
			if (err)
				res.send(err);
					anime.name = req.body.name;
					anime.story = req.body.story;
					anime.language = req.body.language;
					anime.length = req.body.length;
					
					anime.save(function(err) {
					if (err)
						res.send(err);
							res.json({ message: 'Movie Updated!'});
					});
			});
		})
		.delete(function(req, res) {
			Anime.remove({
				_id: req.params.anime_id
			}, function(err, anime) {
				if (err)
					res.send(err);
						res.json({ message: 'successfuly deleted' });
				});
		});


		
app.use('/api', router);
