var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.set('port', 8228);

app.use(function (req, res, next) {
  // Website sending requests
  res.setHeader('Access-Control-Allow-Origin', 'http://web.engr.oregonstate.edu');
  // Request method that you are allowing (we are using GET)
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  // Request header types that are allowed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // The following is set to false since we won't be addressing cookies and sessions
  res.setHeader('Access-Control-Allow-Credentials', false);
  // Proceed to the next layer of middleware
  next();
});	

//1
var apiKey = 'key=0CC6871BABDFF61F08AB616DF19D2940';

//3
function processData(req) {
   var context = {};
   context.method = req.method; //method type saved
   context.qParams = []; //query parameters

   for(var p in req.query) {
     context.qParams.push({	'name': p,'value': req.query[p]});
    }
	
   return context;
}


app.get('/', function(req, res){ 
  //2
  var userInput = processData(req);
  //4
  var reqString = 'http://api.steampowered.com/';
  
  //5
  switch(userInput.qParams[0].value) {
	  case 'GetFriendList':
			reqString += 'ISteamUser/GetFriendList/v0001/?';
			break;
	  case 'GetPlayerSummaries':
			reqString += 'ISteamUser/GetPlayerSummaries/v0002/?';
			break;
	  case 'GetRecentlyPlayedGames':
			reqString += 'IPlayerService/GetRecentlyPlayedGames/v0001/?';
			break;
	  default:
			reqString += 'ISteamUser/GetFriendList/v0001/?';
			break;
  }
  
  //6
  for(var p in userInput.qParams) {

	  if(p != 0){
		  if(p != 1){
			  reqString += '&';
		  }
		  
		  if(userInput.qParams[p].name == 'key'){
			  reqString += apiKey;
		  } else {
			  reqString += userInput.qParams[p].name + '=' + userInput.qParams[p].value;
		  }
	  }

  }
  
  //7
  request(reqString, function (error, response, body) { 
	 if (!error && response.statusCode === 200) {
			res.send(body);
     } else {
		 res.send('Information not available');
	 }
   }); 
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
