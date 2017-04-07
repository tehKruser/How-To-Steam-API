function loadNavBar(){
	
	var ul1 = document.createElement('ul');
	ul1.className = 'nav';
	
	var li1 = document.createElement('li');
	li1.className = 'home-link nav';
	
	var a1 = document.createElement('a');
	a1.href = 'http://web.engr.oregonstate.edu/~krusej/How-To-Steam-API';
	a1.textContent = 'Steam Web API Tutorial';
	a1.className = 'nav';
	
	var li2 = document.createElement('li');
	li2.className = 'dropdown nav';
	
	var a2 = document.createElement('a');
	a2.href = '#';
	a2.className = 'dropbtn nav';
	a2.textContent = 'Navigation';
	
	var div1 = document.createElement('div');
	div1.className = 'dropdown-content nav';
	
	/*  For additional links
	var aX = document.createElement('a');
	aX.href = 'pageX.html';
	aX.textContent = 'Page Title';
	aX.className = 'nav';
	*/
	
	var a3 = document.createElement('a');
	a3.href = 'http://web.engr.oregonstate.edu/~krusej/How-To-Steam-API/01-Server-Side';
	a3.textContent = 'Server Side: Server and Steam Web API URL';
	a3.className = 'nav';
	
	var a4 = document.createElement('a');
	a4.href = 'http://web.engr.oregonstate.edu/~krusej/How-To-Steam-API/02-Server-Side';
	a4.textContent = 'Server Side: Coding!';
	a4.className = 'nav';
	
	var a5 = document.createElement('a');
	a5.href = 'http://web.engr.oregonstate.edu/~krusej/How-To-Steam-API/03-Client-Side';
	a5.textContent = 'Client Side: Pre-Code and Data';
	a5.className = 'nav';
	
	var a6 = document.createElement('a');
	a6.href = 'http://web.engr.oregonstate.edu/~krusej/How-To-Steam-API/04-Client-Side';
	a6.textContent = 'Client Side: Coding!';
	a6.className = 'nav';
	
	var aLast = document.createElement('a');
	aLast.href = 'http://web.engr.oregonstate.edu/~krusej/How-To-Steam-API/05-API-Implementation';
	aLast.textContent = 'API Implementation';
	aLast.className = 'nav';
	
	/* For addition links
	div1.appendChild(aX);
	*/
	
	div1.appendChild(a3);
	div1.appendChild(a4);
	div1.appendChild(a5);
	div1.appendChild(a6);
	div1.appendChild(aLast);
	
	
	li1.appendChild(a1);
	
	li2.appendChild(a2);
	li2.appendChild(div1);
	
	ul1.appendChild(li1);
	ul1.appendChild(li2);
	
	return ul1;
}

document.getElementById('navbar').appendChild(loadNavBar());