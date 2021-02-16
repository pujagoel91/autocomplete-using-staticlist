const api = {
	key: "bff06cdb42994571cf3e664ad94824d1",
	base: "https://api.openweathermap.org/data/2.5/",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
	if(evt.keyCode == 13) {  //13 is for enter key
		if(searchbox.value.split(",").length - 1 < 3 & searchbox.value.split(',')[1].length -1 < 3 & searchbox.value.split(',')[2].length -1 < 4) {
			let err = document.querySelector('.error');
			err.innerText = '';
			getResults(searchbox.value);
			console.log(searchbox.value);
			
		} else {
			let err = document.querySelector('.error');
			err.innerText = 'Input should be of the format City, State [2 digit code], Country [2 digit code]';
			//throw 'Input should be of the format City, State [2 digit code], Country [2 digit code]';
			let city = document.querySelector('.location .city');
			city.innerText = '--';
			
			let currentdate = new Date();
			let date = document.querySelector('.location .date');
			date.innerText = dateBuilder(currentdate);
			
			let temp = document.querySelector('.current .temp');
			temp.innerText = '--';
			
			let wc = document.querySelector('.current .weather');
			wc.innerText = '--';
			
			let hilo = document.querySelector('.current .hilo');
			hilo.innerText = '--/--';
		}	
		
		
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
		let err = document.querySelector('.error');
		err.innerText = weather.message;
		
		let city = document.querySelector('.location .city');
		city.innerText = '--';
		
		let currentdate = new Date();
		let date = document.querySelector('.location .date');
		date.innerText = dateBuilder(currentdate);
		
		let temp = document.querySelector('.current .temp');
		temp.innerText = '--';
		
		let wc = document.querySelector('.current .weather');
		wc.innerText = '--';
		
		let hilo = document.querySelector('.current .hilo');
		hilo.innerText = '--/--';
	} else {
		let city = document.querySelector('.location .city');
		city.innerText = `${weather.name}, ${weather.sys.country}`;
		
		let currentdate = new Date();
		let date = document.querySelector('.location .date');
		date.innerText = dateBuilder(currentdate);
		
		let temp = document.querySelector('.current .temp');
		temp.innerText = `${Math.round(weather.main.temp)}`+ '°F';
		
		let wc = document.querySelector('.current .weather');
		wc.innerText = `${weather.weather[0].main}`;
		
		let hilo = document.querySelector('.current .hilo');
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


