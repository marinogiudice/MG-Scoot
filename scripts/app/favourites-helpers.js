/**
 * The scipt contains helpers functions for the favourites management.
 * It Is to import with favourites.js script where required.
 */


// Gets the passed parameter from the current page url
//return the parameter value
function getParam(param) {
    const url = $(location).attr("search");
    const params = new URLSearchParams(url);
    return params.get(param);
}

//returns localstorage
function getFavouritesLocalStorage() {
    let favouritesRoutes;
    if (localStorage.getItem("favouritesRoutes") === null) {
        favouritesRoutes = [];
    } else {
        favouritesRoutes = JSON.parse(localStorage.getItem("favouritesRoutes"));
    }
    return favouritesRoutes;
}

//checks if the given routes is present into the array
//returns the element position if found, false otherwise.
function findInFavourites(favouritesRoutes, routeId) {
    if(favouritesRoutes) {
        for(let i in favouritesRoutes) {
            if(favouritesRoutes[i].routeId === routeId.toString() ) {
                return i;
            }
        }
    }
    return false;
}