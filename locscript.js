const http = new XMLHttpRequest();
let result = document.querySelector("#result");

document.querySelector("#location").addEventListener("click", () => {
  findMyCoordinates();   //callback function
});

function findMyCoordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locAPI = `https://api-bdc.net/data/reverse-geocode-client?latitude=${position.coords.altitude}&longitude=${position.coords.longitude}`;
        getAPI(locAPI);
      },
      (err) => {
        alert(err.message);
      }
    );
  } else {
    alert("Location cannot found");
  }
}

function getAPI(locAPI) {
  http.open("GET", locAPI);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result.innerHTML = this.responseText;

      const results = JSON.parse(this.responseText);
      console.log(results.localiy);
    }
  };
}
