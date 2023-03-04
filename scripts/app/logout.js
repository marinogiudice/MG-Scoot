/**
 * The function performs user's logout operation
 * it'is used in all the pages where the user icon is showwn and
 * in the login.html page after the user is logged in
 */

function logout() {
    //logOut from the firebase framework
    let promise= auth.signOut();
    //sets the user session to false.
    promise.then(() =>{
        document.cookie="validSession=false";
    });
}