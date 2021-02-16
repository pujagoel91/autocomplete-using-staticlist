const api = {
	key: "bff06cdb42994571cf3e664ad94824d1",
	base: "https://api.openweathermap.org/data/2.5/",
}

const cities = ['Miami', 'New York', 'Chicago', 'Austin', 'Houston', 'Boston', 'Dallas', 'Denver', 
				'Seattle', 'Charlotte', 'Charleston', 'Minneapolis', 'New Orleans', 'Nashville'];
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('input', (e) => {
	let city_array = [];
	if(e.target.value) {
		city_array = cities.filter(city => city.includes(e.target.value));
		city_array = city_array.map(city => `<li>${city}</li>`);
	}
	showCities(city_array);
	
});
searchbox.addEventListener('keypress', setQuery);

// Tutorial- https://www.youtube.com/watch?v=S9lT-5II-Mg


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


function showCities(city_array) {
	const html= !city_array.length ? '' : city_array.join('');
	document.querySelector('ul').innerHTML = html;
}
