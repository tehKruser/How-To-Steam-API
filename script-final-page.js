var apiKey = "22D1833809148DA4D64A03278FF6EBDE";
var steamID = "76561197966297270";
var method = 'GET';
var query1 = "https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=";
var query2 = "&steamid=";
var query3= "&relationship=friend";
var querystring = query1 + apiKey + query2 + steamID + query3;
//console.log(querystring);

/*
var req = new XMLHttpRequest();
req.open(method, "http://flip2.engr.oregonstate.edu:8228", true);
req.setRequestHeader('Content-Type', 'application/json');
req.setRequestHeader('Access-Control-Allow-Origin', '*');
req.send(null);
req.addEventListener('load', function(){
  var response = JSON.parse(req.responseText);
  console.log(response);
	}
);
*/

var req = new XMLHttpRequest();
req.open("get", 'http://flip2.engr.oregonstate.edu:8228', true);
req.addEventListener('load', function() {
  if(req.status >= 200 && req.status < 400) {
    var response = JSON.parse(req.responseText);
    //var numberOfResults = response.totalResults;
    console.log(response);
  } else {
    console.log("Error in network request: " + req.statusText);
  }
});
req.send(null);

/*
  if(req.status >= 200 && req.status < 400){
		var response = JSON.parse(req.responseText);
    console.log(response);
	}else {
		console.log("Error in network request: " + req.statusText);
	}
 */