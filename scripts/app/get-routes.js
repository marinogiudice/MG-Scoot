/**
 * The script  lets to recover routes information from the json routes.json file,
 * by an XMLHttpRequest.
 * The recovered information is then displayed in the routes.html page, an error message is displayed otherwise.
 * It's used in the routes.html page.
 *  
 */

//initialitize the XMLHttpRequest Reference
let xhr = false;

//The function recovers routes information from the json file.
function getRoutes() {
    //sets the status message string to empty string.
    document.getElementById("status-message").innerHTML = "";
    //check if XMLHttpRequest are supported.
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } 
	//imports the routes.json file
    if (xhr) {
        xhr.open("GET", "data/routes.json", true);
        xhr.send();
        //calls the displayRoutes function
        xhr.onreadystatechange = displayRoutes;
    } else {
        document.getElementById("status-message").innerHTML = "<div class='alert alert-danger' role='alert'>Error. Could not perfom XMLHttpRequest</div>";
    }
}


//The function displays reovered routes information in the routes page
function displayRoutes() {
    //if the XMLHttpRequest is been successful
    if (xhr.readyState === 4) {
        if(xhr.status === 200) {
            //Makes the json data accessible into the app.
            const data = JSON.parse(xhr.responseText);
            //initialitize the output string;
            let output = "";
            //Visit the received data and builds the poutput string.
            for (let i in data.routes) {
                output += "<tr><th scope='row'>" +
                data.routes[i].name + "</th><td>" +
                data.routes[i].day + "</td><td class='d-none d-md-table-cell'>" + 
                data.routes[i].time + "</td><td class='d-none d-lg-table-cell'>" +
                data.routes[i].highlights + "</td><td class='text-left'><a class='btn btn-secondary text-left' href='route.html?routeId=" +
                //creates url's parameter for each routes entry
                encodeURI(data.routes[i].routeID) + "&name="+
                encodeURI(data.routes[i].name) +"' >Details</a></td></tr>";
            }
            //inserts the output string(routes information) into the dom
            document.getElementById("routes-data-insertion-point").innerHTML = output;
        } else {
            //if the XMLHttpRequest was not successful, displays an error message.
            document.getElementById("status-message").innerHTML = "<div class='alert alert-danger' role='alert'>Could not perform the stated request - Error: " + xhr.status + "</div>";
        }
    }  
}

//calls the getRoutes function when the loads.
window.onload = getRoutes;
