var findMe = $("#findMyLocation");
var status = $("#search-results");
var API_KEY = "675f38ddab3b5842e555b4006a7973c1";
var searchForm = $("#search-form");
var cityArr = [];
var currentDay = moment().subtract(10, 'days').calendar();

searchForm.on("submit", function (event) {
  event.preventDefault()
  var city = $("#search-input").val()
  console.log("Search for city! " + city)

  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_KEY;
    
  console.log(queryUrl)
 

  $.ajax({
      url: queryUrl,
      method: "GET"
    })
    .then(function (weatherRes) {
      console.log(weatherRes);
      var coordinates=weatherRes.coord
     
      ;
      $(".City").text(weatherRes.name + " " + currentDay);
      $(".Temperature").text(weatherRes.main.temp);
      $(".Humidity").text(weatherRes.main.humidity);
      $(".Wind-Speed").text(weatherRes.wind.speed);
      // currentDay.text(day.format('dddd, MMMM Do YYYY'));



      cityArr.push(city)
      console.log(cityArr)
      /*  weatherSearch (city,country) */

      $('#search-input').val("");
      $('#user-input').empty()

      cityArr.forEach(function (city) {
        $("<button>")
          .addClass('btn btn-outline-success city-btn btn-group')
          .text(city)
          .attr("weather-data", city)
          .appendTo("#user-input");
      });
    
      getUvIndex(coordinates)
      fiveDayForecast(city);
    });
    })

    function getUvIndex(coordinateObject) {
      var queryUrl ="http://api.openweathermap.org/data/2.5/uvi?lat=" + coordinateObject.lat + "&lon=" + coordinateObject.lon + "&appid=" + API_KEY;
      console.log(queryUrl)
      $.ajax({
        url: queryUrl,
        method: "GET"
      }) 
      .then(function (uvRes) {
        console.log(uvRes);
        $(".uv-index").text(uvRes.value);
      }); 
    }
function fiveDayForecast(city) {
  var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + API_KEY;
  console.log(forecastUrl);
  
    $.ajax({
    url:forecastUrl,
    method: "GET"
  })
  .then(function (forecastRes) {
    console.log("Forecast: ", forecastRes);

    var fiveDayList = forecastRes.list.filter(function(day) {
      if (day.dt_txt.includes("12:00")) {
        console.log(day);
        return true;
      }
      return false;
    });
    
    fiveDayList.forEach(function(day) {
      console.log(day);
    $('.five-day').append(`
    <div class="col-md-2 col-12">
      <div class="card">
        <div class="card-body bg-primary">
          <h6>${day.dt_txt}</h6>
          <p>Temp: ${day.main.temp} F</p>
          <p>Humidity: ${day.main.humidity}%</p>
        </div>
      </div>
    </div>  
    `)
      
    });
  }); 
}


      // for (var i = 0; i < forecastRes.list.length; i++) {
      //   if(forecastRes.list[i].dt_txt.split(" ")[1].split(":")[0] === "12"){          
      //     console.log(forecastRes.list[i])
      //     var imageUrl= "http://openweathermap.org/img/wn/10d@2x.png=" +  "10d=" + API_KEY;
      //     (console.log(imageUrl)

          
      //   }
      // }
    

/* var fiveDayArr = weatherRes.list.filter(function (weatherObj) {
  if (weatherObj.dt_txt.includes('06:00:00')) {
    return true;
  } else {
    return false;
  }
}); */
/* });

}) */

findMe.on("click", function () {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    console.log(latitude, longitude)

  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});