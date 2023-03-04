/**
 * The script  lets to recover routes information from the json routes.json file,
 * by an XMLHttpRequest.
 * The recovered information is then displayed in the routes.html page, an error message is displayed otherwise.
 * It's used in the routes.html page.
 *  
 */

//initialize the XMLHttpRequest Reference
let xhr = false;

//The function recovers routes information from the json file.
//calls the displayRoute function to display the route information in the page
function getRoute() {
    if(window.XMLHttpRequest) {
        xhr= new XMLHttpRequest();
    }    
    if(xhr) {
        xhr.open("GET", "data/routes.json", true);
        xhr.send();
        xhr.onreadystatechange = displayRoute;
    } else {
        document.getElementById("route-status-message-insertion-point").innerHTML = "<div class='alert alert-danger' role='alert'>XMLHttpRequestNotSupported.</div>"
    }
}

//the function displays the route information in the route.html page.
//recovers the route id from the url.
function displayRoute() {
    if (xhr.readyState === 4) { 
        if(xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            //initialize the elements to populate in the page
            let output = "";
            let picture= "";
            let breadcrumb="";
            //gets the url
            const url = $(location).attr("search");
            //gets the parameters from the url
            const params = new URLSearchParams(url);
            //visits the routes information from the json file
            for (let i in data.routes) {
                //looks for the route matching the url parameters 
                if(data.routes[i].routeID === params.get("routeId")) {
                    //set the route information table
                    output = "<tr><th>Tour Name</th><td>" + 
                    data.routes[i].name + "</td></tr><tr><th>Day</th><td>" +
                    data.routes[i].day + "</td></tr><tr><th>Time</th><td>" +
                    data.routes[i].time + "</td></tr><tr><th>Start Point</th><td>lat: " +
                    data.routes[i].startLat + "/lng: " +
                    data.routes[i].startLng + "</td></tr><tr><th>End Point</th><td>lat: " +
                    data.routes[i].endLat + "/lng: " +
                    data.routes[i].endLng + "</td></tr><tr><th>Highlights</th><td>" +
                    data.routes[i].highlights + "</td></tr>";
                    //sets the picture
                    picture = "<img class='img-fluid w-100' src='media/" +
                    data.routes[i].image + "'>";
                    //sets the name in the breadcrumb
                    breadcrumb = data.routes[i].name;
                    let startPoint = { lat: data.routes[i].startLat, lng: data.routes[i].startLng };
                    let endPoint = { lat: data.routes[i].endLat, lng: data.routes[i].endLng };
                    initMap(startPoint, endPoint);
                }
            }
            //inserts the generated elements into the dom
            document.getElementById("route-insertion-point").innerHTML = output;
            document.getElementById("img-insertion-point").innerHTML = picture;
            document.getElementById("breadcrumb-insertion-point").innerHTML = breadcrumb;
        } else {
            //if the XMLHttpRequest was not successful, displays an error message.
            document.getElementById("route-status-message-insertion-point").innerHTML = "<div class='alert alert-danger' role='alert'>Could not perform the stated request - Error: " + xhr.status + "</div>";
        }
    }


    //the function initialize the map
    function initMap(startPoint, endPoint) {
        //creates the map object and insert it in to the dom
        const map = new google.maps.Map(
            document.getElementById("map"), {
                //sets map properties
                zoom:10,
                center: {lat: startPoint.lat, lng: startPoint.lng},
                fullscreenControl: false,
                mapTypeId: "terrain"
            });
            //creates the infowindow to dispaly onclick on the start marker
            const contentStart ="<div id='bodyContent'><p>Starting Point</p></div>";
            const infoStart = new google.maps.InfoWindow({
                content: contentStart,
              });

        //creates the startMarker
        const startMarker = new google.maps.Marker({
            position: new google.maps.LatLng(startPoint.lat, startPoint.lng), 
            map: map,
            title: "Start"
        });
        //sets icon and listener on the start marker
        startMarker.setIcon("https://maps.google.com/mapfiles/ms/icons/red.png");
        startMarker.addListener("click", () => {
            infoStart.open({
              anchor: startMarker,
              map,
              shouldFocus: false,
            });
          });
        
          //creates the infowindow for the end marker
        const contentEnd ="<div id='bodyContent'><p>End Point</p></div>";
        const infoEnd = new google.maps.InfoWindow({
            content: contentEnd,
        });

        //creates the endMArker
        const endMarker = new google.maps.Marker({
            position: new google.maps.LatLng(endPoint.lat, endPoint.lng), 
            map: map,
            title: "End",
        });
        //sets the icon and the listener on the endMarker to display the infowindow and adds it to the map
        endMarker.setIcon("https://maps.google.com/mapfiles/ms/icons/red.png");
        endMarker.addListener("click", () => {
            infoEnd.open({
              anchor: endMarker,
              map,
              shouldFocus: false,
            });
          });

       //interrogates the browser for geolocation support
       if(!navigator.geolocation) {
        document.getElementById("route-status-message-insertion-point").innerHTML = "<div class='alert alert-danger' role='alert'>GeoLocation Not Supported.</div>";
        } else {
            //retrieves user current location
            navigator.geolocation.getCurrentPosition(success, error,);
        }

        //position retrieved success callback
        function success(position) {
            //retrieves user latitude and longitude
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            //creates the infowindow to add to the user marker
            const contentUser ="<div id='bodyContent'><p>You are Here</p></div>";
            const infoUser = new google.maps.InfoWindow({
                content: contentUser,
            });
            //creates the userMarker and adds it to the map
            const usermarkerPos = new google.maps.LatLng(userLat, userLng);
            const userMarker = new google.maps.Marker({
                position: usermarkerPos,
                map: map,
                title: "You are here."
            });
            //sets the user marker icon and listener to open the infowindow
            userMarker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue.png");
            userMarker.addListener("click", () => {
                infoUser.open({
                  anchor: userMarker,
                  map,
                  shouldFocus: false,
                });
              });
        }
        
        //user retrivial erro callback
        function error () {
            document.getElementById("route-status-message-insertion-point").innerHTML = "<div class='alert alert-danger' role='alert'>Error - Unable to Retrieve your Location.</div>";
        }
    }
}

//calls the getRoute function once the page is loaded.
window.onload = getRoute;