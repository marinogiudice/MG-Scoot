/**
* The script initialitize the firebase auth object.
* Listens for authorization's state changes of the current user.
* Sets the dropdown menu of the user icon in the pages accordingly.
* It's been imported in all the pages where the user icon is shown.
*/

//create a reference to the firebase auth object.
const auth = firebase.auth();

//listens for user authentication state changes and behave accordingly.
auth.onAuthStateChanged(user => {
    // if the user is logged in sets the logout links in the dropdown menu
    if (user) {
        $("#user-links-insertion-point").html("");
        $("#user-links-insertion-point-md").html("");
        $("#user-links-insertion-point").html("<a class='dropdown-item' href='#' id='logout' onclick='logout()'>Logout</a>");
        $("#user-links-insertion-point-md").html("<a class='dropdown-item' href='#' id='logout' onclick='logout()'>Logout</a>");
    } else {
        //if the user is not logged in sets the login and signup links in the dropdown menu. 
        $("#user-links-insertion-point").html("");
        $("#user-links-insertion-point-md").html("");
        $("#user-links-insertion-point").html("<a class='dropdown-item' href='login.html'>Login</a><a class='dropdown-item' href='login.html'>Sign Up</a>");
        $("#user-links-insertion-point-md").html("<a class='dropdown-item' href='login.html'>Login</a><a class='dropdown-item' href='login.html'>Sign Up</a>");
    }
});