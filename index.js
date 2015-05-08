// Creation of global variable storing the weather information.
var cityWeather = {};

// Get json weather data
var weatherUrl = 'https://publicdata-weather.firebaseio.com/.json';

$.ajax( weatherUrl )
    .done(function( data ) {
	// weather data stored in global variable
	cityWeather = data;
	console.log(cityWeather);
	// call weatherLoaded function once weather data is accessible
	weatherLoaded();
    })
    .fail(function( error ) {
	console.log("Error");
	console.log(error);
    });

// loops through weather data to create HTML elements
function weatherLoaded() {
    // iterates through cityWeather object
    $.each( cityWeather, function (cityKey, value) {
	display( cityKey );     // calls display using cityKey name
    });
};

// creates HTML for relevant city
function display( city ) {
    // gets the relevant city weather object via the global variable cityWeather and the key
    var cityWeatherInformation = cityWeather[city];
    // HTML string built (uses definition list)
    var string = '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div id="' + city + '" class="cities"><header><h2>' + city + '</h2></header><dl class="' + city + ' dl-horizontal"></dl></div></div>';
    // adds the created string to the div with row class
    $(".row").append(string);
    // adds information regarding current temperature and summary
    $("." + city).append("<dt>Temperature:</dt><dd>" + cityWeatherInformation.currently.temperature + "</dd>");
    $("." + city).append("<dt>Summary:</dt><dd>" + cityWeatherInformation.currently.summary + "</dd>");
    // adds class to the city based on JSON icon e.g. cloudy, clear, etc
    $("#" + city).addClass(cityWeatherInformation.currently.icon);
};
