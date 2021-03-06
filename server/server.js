var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT||1337;
var router = express.Router();
var appRoutes = require('../server/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../public/dist/'))); // Giving Access
app.use('/api',appRoutes);

//===========Log4j setup============//
const log4js = require('log4js');
log4js.configure({
  appenders: { demandcapacity: { 
							  	type: 'dateFile', 
							  	filename: 'logs/demandcapacity.log',
							    "pattern": "-yyyy-MM-dd",
							    alwaysIncludePattern:true 
						      } 
			 },
  categories: { default: { appenders: ['demandcapacity'], level: 'trace' } }
});
const logger = log4js.getLogger('demandcapacity');
//============Log4j setup===========//


//var mongodbUri = 'mongodb://laxmi:Laxmi123@ds119810.mlab.com:19810/pmodb';

var mongodbUri = 'mongodb://DIN66008608.corp.Capgemini.com:27017/pmodev';

var options = {};

var connection = mongoose.connect(mongodbUri,options, function(err) {	
	if(err){
		logger.error('Connection Failed.'+err);
	} else {
		console.log('Connection Successful');
		logger.info('Connection Successful.');
	}
}); 



/*app.get('/', function(req, res) {
  res.send('Hello World');
});*/

app.get('*', function(req,res){
	res.sendfile(path.resolve(path.join(__dirname, '../public/dist/index.html')))
})

app.listen(port, function(){
	console.log('Running the Server on port : ' + port);
});