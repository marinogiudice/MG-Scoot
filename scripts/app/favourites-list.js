
/**
 * The scripts allows the favourites management.
 */

//The function lists the favourites routes present in localstorage.
//uses the helper function getLocalStorage to retrieve localStorage
function listFavourites() {
    let favouritesRoutes = getFavouritesLocalStorage();
    //lists the name of the items present in local storage with a remove button
    if (favouritesRoutes && favouritesRoutes.length > 0) {
        for(let i in favouritesRoutes) {
            $("#favourites-list-insertion-point").append("<tr id='" + favouritesRoutes[i].routeId +"'><td>" +
            favouritesRoutes[i].routeName +"</td><td><button class='btn btn-secondary' onclick='deleteFavourite("+favouritesRoutes[i].routeId+")'>Delete</button></td></tr>");
        }
    }
    //if no routes are added to localstorage displays a message
    else {
        $("#status-message").html("<div class='alert alert-danger' role='alert' id='status-message'>List Empty</div>");
    }
}

//the function deletes a route from the favourites
//gets as parameter the route id
//lists again the favourites list.
//uses helpers functions
function deleteFavourite(id) {
    let favouritesRoutes = getFavouritesLocalStorage();
    let found=findInFavourites(favouritesRoutes,id);
    if(found) {
        //removes the route from localstorage
        favouritesRoutes.pop(favouritesRoutes[found]);
        localStorage.setItem("favouritesRoutes", JSON.stringify(favouritesRoutes));
        $("#favourites-list-insertion-point").html("");
        listFavourites();
    }
}

$(document).ready(function () {
    listFavourites();
});

