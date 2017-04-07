var method = 'GET';

function createRowCells(x){
	var row = document.createElement('div');
	row.style.display = 'table-row';
	row.style.verticalAlign = 'middle';
	
	
	for(var i = 0; i < x; i++) {
		var cell = document.createElement('div');
		cell.className = 'col' + i;
		if(i == 1) {cell.style.width = '75px';}
		else if(i == 3) {cell.style.width = '150px';}
		else if(i == 4) {/* Do not set width */}
		else {cell.style.width = '200px';}
		cell.style.height = '34px';
		cell.style.display = 'table-cell';
		row.appendChild(cell);	
	}
	return row;
}

function accountSummaries(sid, e){
	var req = new XMLHttpRequest();
	req.open(method, 'http://flip3.engr.oregonstate.edu:8228?method=GetPlayerSummaries&key=x&steamids=' + sid, true);
	req.addEventListener('load', function() {
		if(req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			var cell = e.firstChild;
			cell.textContent = response.response.players[0].personaname;
			
			cell = cell.nextSibling;
			
			var avatar = document.createElement('img')
			avatar.setAttribute('src', response.response.players[0].avatarmedium);
			cell.appendChild(avatar);
			
			cell = cell.nextSibling;
			
			switch(response.response.players[0].personastate) {
				case 0:
						cell.textContent = 'Offline';
						break;
				case 1:
						cell.textContent = 'Online';
						break;
				case 2:
						cell.textContent = 'Busy';
						break;
				case 3:
						cell.textContent = 'Away';
						break;
				case 4:
						cell.textContent = 'Snooze';
						break;
				case 5:
						cell.textContent = 'looking to trade';
						break;
				case 6:
						cell.textContent = 'looking to play';
						break;
				default:
						cell.textContent = 'Offline';
						break;
			}		
		} else {
			console.log("Error in network request: " + req.statusText);
		}
	});
	req.send(null);
}

function fillHeaderRow(row) {
	var headerColor = '#334259'
	var cells = row.childNodes;

	for(var cell in cells) {

		if(cell >= 0 && cell < 5){	
			cells[cell].style.fontWeight = 'bold';
			cells[cell].style.backgroundColor = headerColor;
			
			switch(cell) {
				case '0':
					cells[cell].textContent = 'Steam ID';
					break;
				case '1':
					cells[cell].textContent = 'Avatar';
					break;
				case '2':
					cells[cell].textContent = 'Gamer Tag';
					break;
				case '3':
					cells[cell].textContent = 'Status';
					break;
				case '4':
					cells[cell].textContent = 'Recent Games';
					break;
				default:
					cells[cell].textContent = '?';
					break;
			}
		}
	}
}

function getRecentGames(resp, x, e){
	var req = new XMLHttpRequest();
	req.open(method, 'http://flip3.engr.oregonstate.edu:8228?method=GetRecentlyPlayedGames&key=x&steamid=' + resp.friendslist.friends[x].steamid + '&format=json', true);
	req.addEventListener('load', function() {
		if(req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			var emptyObject = {};
			if(response.response.total_count == undefined){
			}
			var children = e.childNodes;
			if(response.response.total_count !== undefined){
				if(response.response.total_count !== 0){
					for(var k = 0; k < response.response.total_count; k++){
						children[4].textContent += response.response.games[k].name;
						if(k < response.response.total_count - 1){
							children[4].textContent += ', ';
						}
					}
				} else {
					children[4].textContent = 'No games played in last 2 weeks';
					children[4].style.fontStyle = 'italic';
					children[4].style.color = '#cccccc';
				}
			} else {
				children[4].textContent = 'Information not available';
				children[4].style.fontStyle = 'italic';
				children[4].style.color = '#cccccc';
			}
			
			document.getElementById('results_table').appendChild(e);
			
		} else {
			console.log("Error in network request: " + req.statusText);
		}
	});
	req.send(null);
}

function friendSummaries(resp, x, e){
	var req = new XMLHttpRequest();
	req.open(method, 'http://flip3.engr.oregonstate.edu:8228?method=GetPlayerSummaries&key=x&steamids=' + resp.friendslist.friends[x].steamid, true);
	req.addEventListener('load', function() {
		if(req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			var children = e.childNodes;
			var avatar = document.createElement('img')
			avatar.setAttribute('src', response.response.players[0].avatar);
			children[1].appendChild(avatar);
			children[2].textContent = response.response.players[0].personaname;
			
			switch(response.response.players[0].personastate) {
				case 0:
						children[3].textContent = 'Offline';
						break;
				case 1:
						children[3].textContent = 'Online';
						break;
				case 2:
						children[3].textContent = 'Busy';
						break;
				case 3:
						children[3].textContent = 'Away';
						break;
				case 4:
						children[3].textContent = 'Snooze';
						break;
				case 5:
						children[3].textContent = 'looking to trade';
						break;
				case 6:
						children[3].textContent = 'looking to play';
						break;
				default:
						children[3].textContent = 'Offline';
						break;
			}
			getRecentGames(resp, x, e);
			
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
				
				var myNode = document.getElementById("results_table");
				while (myNode.firstChild) {
					myNode.removeChild(myNode.firstChild);
				}
				
				var accountHeaderRow = createRowCells(3);
				
				var cell = accountHeaderRow.firstChild;
				var i = 0;
				while(cell != undefined) {
					switch(i){
						case 0:
							cell.textContent = 'Gamer Tag';
							break;
						case 1:
							cell.textContent = 'Avatar';
							cell.style.width = '150px'
							break;
						case 2:
							cell.textContent = 'Status';
							break;
					}
					cell.style.fontWeight = 'bold';
					cell.style.fontSize = '1.3em';
					cell.style.color = '#d9d9d9';
					i++;
					cell = cell.nextSibling;
				}
				
				document.getElementById('results_table').appendChild(accountHeaderRow);
				
				accountInfoRow = createRowCells(3);
				
				cell = accountInfoRow.firstChild;
				var i = 0;
				while(cell != undefined) {
					cell.style.fontWeight = 'bold';
					cell.style.fontSize = '1.7em';
					i++;
					cell = cell.nextSibling;
				}
				
				accountSummaries(steamID, accountInfoRow);
				
				document.getElementById('results_table').appendChild(accountInfoRow); 
				
				var someText = document.createElement('h3');
				someText.textContent = 'Friends List:'
				someText.style.color = '#d9d9d9';
				document.getElementById('results_table').appendChild(someText);
				
				var rowH = createRowCells(5);
				
				fillHeaderRow(rowH);
				
				document.getElementById('results_table').appendChild(rowH);
				
				for(var i in response.friendslist.friends){
					
					var row = createRowCells(5);
					row.firstChild.textContent = response.friendslist.friends[i].steamid;
					
					friendSummaries(response, i, row);
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