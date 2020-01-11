var findMe = document.getElementById("find-me");
var status = document.getElementById("geo-status");
var API_KEY = "166a433c57516f51dfab1f7edaed8413"
var searchForm = $("#search-form")

searchForm.on("submit", function (event) {
  event.preventDefault()
  var city = $("#search-input").val()
  console.log("Search for city! " + city)

  var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=" + API_KEY;
  console.log(queryUrl)
  
  $.ajax({
    url: queryUrl,
    metho: "GET"
  })
    .then(function (data) {
      console.log(data)
    })
})

findMe.onclick = function () {
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
}


