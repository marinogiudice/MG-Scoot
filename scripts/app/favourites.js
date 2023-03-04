/**
 * The script checks if the route is been added to favourites 
 * Displays the Add to or Remove from favourites button
 * Uses the add function to manage the favourites local storage.
 */

$(document).ready(function () {
    let id = getParam("routeId");
    let favouritesRoutes = getFavouritesLocalStorage();
    if (favouritesRoutes && findInFavourites(favouritesRoutes,id)) {
        $("#favourites-button-insertion-point").html("<button class = 'btn btn-secondary' onclick='add()'>"  +
            "Remove from Favourites</button>");
    } else {
        $("#favourites-button-insertion-point").html("<button class = 'btn btn-secondary' data-toggle = 'modal'" +
            " data-target = '#favouritesModal' onclick='add()'>Add to Favourites</button>");
    }
});

/**
 * The function adds or remove a route from the favouritesRoutes localstorage.
 * Uses the helper function getParam for the route parameter retrieval from the url
 * Uses the helper function getLocalStorage for the retrieval of favouritesRoutes from the local storage.
 * Uses the helper function findInFAvourites to check if a route is already a favouriteroute.
 */

function add() {
    //gets the route parameters fromm the url
    let routeId = getParam("routeId");
    let routeName = getParam("name");
    //gets localstorage and load it into an array
    let favouritesRoutes = getFavouritesLocalStorage();
    //checks if the route is already present in localstorage and so a favourite route
    let found=findInFavourites(favouritesRoutes,routeId)
    //if present the route is removed from the array.
    if(found) {
        favouritesRoutes.pop(favouritesRoutes[found]);
        //The array is rewritten to localStorage
        localStorage.setItem("favouritesRoutes", JSON.stringify(favouritesRoutes));
        //The modal content is populated accordingly
        $("#favourites-modal-header-insertion-point").html("Route "+routeName);
        $("#favourites-modal-body-insertion-point").html("<p>Route "+routeName+" Removed From Favourites</p>");
        //The right button is inserted into the dom
        $("#favourites-button-insertion-point").html("<button class = 'btn btn-secondary float-left' data-toggle = 'modal'" +
            " data-target = '#favouritesModal' onclick='add()'>Remove from Favourites</button>");
        $("#favourites-button-insertion-point").html("<button class = 'btn btn-secondary' data-toggle = 'modal'" +
        " data-target = '#favouritesModal' onclick='add()'>Add to Favourites</button>");     
    //if not present the route information are added to the array. 
    } else {
        obj={routeId,routeName};
        favouritesRoutes.push(obj);
        //the array is then written in localstorage
        localStorage.setItem("favouritesRoutes", JSON.stringify(favouritesRoutes));
        //the modal content is set accordingly
        $("#favourites-modal-header-insertion-point").html("Route "+routeName);
        $("#favourites-modal-body-insertion-point").html("<p>Route "+routeName+" Added To Favourites</p>");
        //The right button is inserted into the dom.
        $("#favourites-button-insertion-point").html("<button class = 'btn btn-secondary float-left' data-toggle = 'modal'" +
            " data-target = '#favouritesModal' onclick='add()'>Remove from Favourites</button>");
    } 
}