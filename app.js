var server					= require('gulp-express'),
	express					= require('express'),
	mongoose				= require('mongoose'),
	methodOverride 			= require('method-override'),
	morgan					= require('morgan'),
	bodyParser 				= require('body-parser'),
	mongoose				= require('mongoose');

	var app = express();

	// connecting to mongodb
	mongoose.connect('mongodb://localhost/anime');
	
	var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			console.log('Connected to anime database!');
		});
	
	var routes = require('./server/routes/anime.server.routes');

	app.use(express.static('./'));
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
	app.use(methodOverride());
	app.use('/', routes);


	// connecting to port 
	app.listen(8080);
	console.log('localhost 8080'); 