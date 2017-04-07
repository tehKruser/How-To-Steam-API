var method = 'GET';


function getRecentGames(resp, x, e){
	var req3 = new XMLHttpRequest();
	//console.log(document.getElementById('row_o').firstChild.textContent);
	req3.open(method, 'http://flip3.engr.oregonstate.edu:8228?method=GetRecentlyPlayedGames&key=x&steamid=' + resp.friendslist.friends[x].steamid + '&format=json', true);
	req3.addEventListener('load', function() {
		if(req3.status >= 200 && req3.status < 400) {
			var response3 = JSON.parse(req3.responseText);
			console.log(response3);
			var emptyObject = {};
			//console.log(response3.response.total_count);
			if(response3.response.total_count == undefined){
				console.log('Not available!');
			}
			var children = e.childNodes;
			if(response3.response.total_count !== undefined){
				if(response3.response.total_count !== 0){
					for(var k = 0; k < response3.response.total_count; k++){
						children[2].textContent += response3.response.games[k].name;
						if(k < response3.response.total_count - 1){
							children[2].textContent += ', ';
						}
					}
				} else {
					children[2].textContent = 'No games played in last 2 weeks';
					children[2].style.fontStyle = 'italic';
					children[2].style.color = '#cccccc';
				}
			} else {
				children[2].textContent = 'Information not available';
				children[2].style.fontStyle = 'italic';
				children[2].style.color = '#cccccc';
			}
			
			
		} else {
			console.log("Error in network request: " + req3.statusText);
		}
	});
	req3.send(null);
}

function findSIDName(resp, x, e){
	var req2 = new XMLHttpRequest();
	//console.log(document.getElementById('row_o').firstChild.textContent);
	req2.open(method, 'http://flip3.engr.oregonstate.edu:8228?method=GetPlayerSummaries&key=x&steamids=' + resp.friendslist.friends[x].steamid, true);
	req2.addEventListener('load', function() {
		if(req2.status >= 200 && req2.status < 400) {
			var response2 = JSON.parse(req2.responseText);
			//console.log(response2);
			var children = e.childNodes;
			children[1].textContent = response2.response.players[0].personaname;
			
			getRecentGames(resp, x, document.getElementById('row_' + x));
			
		} else {
			console.log("Error in network request: " + req2.statusText);
		}
	});
	req2.send(null);
}

function findSIDHeaderName(sid, e){
	var req = new XMLHttpRequest();
	//console.log(document.getElementById('row_o').firstChild.textContent);
	req.open(method, 'http://flip3.engr.oregonstate.edu:8228?method=GetPlayerSummaries&key=x&steamids=' + sid, true);
	req.addEventListener('load', function() {
		if(req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			//console.log(response);
			e.textContent = response.response.players[0].personaname + '\'s Friends List' ;	
		} else {
			console.log("Error in network request: " + req.statusText);
		}
	});
	req.send(null);
}

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	
	document.getElementById('sidSubmit').addEventListener('click', function(event){
		var steamID = document.getElementById('sid').value;
		var req = new XMLHttpRequest();
		req.open(method, 'http://flip3.engr.oregonstate.edu:8228?method=GetFriendList&key=x&steamID=' + steamID + '&relationship=friend', true);
		req.addEventListener('load', function() {
		  if(req.status >= 200 && req.status < 400) {
			if(req.responseText != 'Information not available'){
		
				var response = JSON.parse(req.responseText);
				console.log(response);
				
				var myNode = document.getElementById("results_table");
				while (myNode.firstChild) {
					myNode.removeChild(myNode.firstChild);
				}
				
				var sidHeader = document.createElement('h3');
				sidHeader.id = 'sidHeader';
				document.getElementById('results_table').appendChild(sidHeader);
				findSIDHeaderName(steamID, document.getElementById('sidHeader'));
				
				var headerColor = '#334259'
				
				var rowH = document.createElement('div');
				rowH.id = 'header_row';
				rowH.style.display = 'table-row';
				
				var cell1 = document.createElement('div');
				cell1.className = 'col1';
				cell1.style.width = '300px';
				cell1.style.display = 'table-cell';
				cell1.textContent = 'Steam ID';
				cell1.style.fontWeight = 'bold';
				cell1.style.backgroundColor = headerColor;
				
				var cell2 = document.createElement('div');
				cell2.className = 'col2';
				cell2.style.width = '300px';
				cell2.style.display = 'table-cell';
				cell2.textContent = 'Gamer Tag';
				cell2.style.fontWeight = 'bold';
				cell2.style.backgroundColor = headerColor;
				
				var cell3 = document.createElement('div');
				cell3.className = 'col2';
				cell3.style.display = 'table-cell';
				cell3.textContent = 'Recent Games';
				cell3.style.fontWeight = 'bold';
				cell3.style.backgroundColor = headerColor;
				
				rowH.appendChild(cell1);
				rowH.appendChild(cell2);
				rowH.appendChild(cell3);
				
				document.getElementById('results_table').appendChild(rowH);
				
				var col1H = document.createElement('div');
				
				for(var i in response.friendslist.friends){
					//console.log('steam id: ' + response.friendslist.friends[i].steamid);
					
					var row = document.createElement('div');
					row.id = 'row_' + i;
					row.style.display = 'table-row';
					
					var cell1 = document.createElement('div');
					cell1.className = 'col1';
					cell1.style.width = '300px';
					cell1.style.display = 'table-cell';
					cell1.textContent = response.friendslist.friends[i].steamid;
					
					row.appendChild(cell1);
					
					var cell2 = document.createElement('div');
					cell2.className = 'col2';
					cell2.style.width = '300px';
					cell2.style.display = 'table-cell';
					cell2.textContent = '';
					
					row.appendChild(cell2);
					
					var cell3 = document.createElement('div');
					cell3.className = 'col2';
					cell3.style.display = 'table-cell';
					cell3.textContent = '';
					
					row.appendChild(cell3);
					
					document.getElementById('results_table').appendChild(row);
					
					findSIDName(response, i, document.getElementById('row_' + i));
				}
			} else {
				alert(req.responseText + ' for Steam ID ' + steamID + '. This profile may be set to private.');
			}
		  } else {
			console.log("Error in network request: " + req.statusText);
		  }
		});
		req.send(null);		
		event.preventDefault();
	});	
}