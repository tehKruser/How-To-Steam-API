var apiKey = "E1D303A7F3291E155F246DCF0230B65D";
var steamID = "76561197966297270";
var method = 'GET';
var query1 = "https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=";
var query2 = "&steamid=";
var query3= "&relationship=friend";
var querystring = query1 + apiKey + query2 + steamID + query3;
//console.log(querystring);

var req = new XMLHttpRequest();
req.open(method, "https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=90E48644726077A5E93BCC32953DCF46&steamid=76561197966297270&relationship=friend", true);
req.setRequestHeader('Content-Type', 'application/json');
req.addEventListener('load', function(){
  var response = JSON.parse(req.responseText);
  console.log(response);
	}
);
req.send(null);

/*
  if(req.status >= 200 && req.status < 400){
		var response = JSON.parse(req.responseText);
    console.log(response);
	}else {
		console.log("Error in network request: " + req.statusText);
	}
 */