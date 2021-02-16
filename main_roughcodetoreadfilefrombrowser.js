const api = {
	key: "bff06cdb42994571cf3e664ad94824d1",
	base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
let err = document.querySelector('.error');
let city = document.querySelector('.location .city');
let currentdate = new Date();
let date = document.querySelector('.location .date');
let temp = document.querySelector('.current .temp');
let wc = document.querySelector('.current .weather');
let hilo = document.querySelector('.current .hilo');

function setQuery(evt) {
	if(evt.keyCode == 13) {  //13 is for enter key
		getResults(searchbox.value);
		console.log(searchbox.value);		
	} 	
}

function getResults(city) {
	fetch(`${api.base}weather?q=${city}&units=imperial&appid=${api.key}`)
	.then(weather => {
		return weather.json();
	}).then(displayResults);
}

function displayResults(weather) {
	console.log(weather);
	if(weather.cod == '404') {
		err.innerText = weather.message;
		city.innerText = '--';
		date.innerText = dateBuilder(currentdate);
		temp.innerText = '--';
		wc.innerText = '--';
		hilo.innerText = '--/--';
	} else {
		city.innerText = `${weather.name}, ${weather.sys.country}`;
		date.innerText = dateBuilder(currentdate);
		temp.innerText = `${Math.round(weather.main.temp)}`+ '°F';
		wc.innerText = `${weather.weather[0].main}`;
		hilo.innerText = `${Math.round(weather.main.temp_min)}` + '°F' +'/' + `${Math.round(weather.main.temp_max)}`+ '°F';
	}
		
}

function dateBuilder(d) {
	let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	
	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();
	
	return `${day}, ${date} ${month} ${year}`;
}

function handleFiles(files) {
	console.log('Reached handlefiles');
	if(window.FileReader) {
		// FileReader is supported.
		getAsText(files[0]);
	} else {
		console.log('Not supported');
		alert('FileReader is not supported in this browser');
	}
}

function getAsText(fileToRead) {
	  var reader = new FileReader();
	  // Read file into memory as UTF-8      
	  reader.readAsText(fileToRead);
	  // Handle errors load
	  reader.onload = loadHandler;
	  reader.onerror = errorHandler;
}

function loadHandler(event) {
      var csv = event.target.result;
      processData(csv);
}

function processData(csv) {
	var allTextLines = csv.split(/\r\n|\n/);
	var lines = [];
	for (var i=0; i<allTextLines.length; i++) {
		var data = allTextLines[i].split(';');
			var tarr = [];
			for (var j=0; j<data.length; j++) {
				tarr.push(data[j]);
			}
			lines.push(tarr);
	}
  console.log(lines);
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
	  alert("Cannot read file !");
  }
}

//check https://blog.mounirmesselmeni.de/2012/11/20/reading-csv-file-with-javascript-and-html5-file-api/
//check https://www.youtube.com/watch?v=ZZncFax8yNY
