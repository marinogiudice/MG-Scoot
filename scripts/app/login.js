/**
* Listens for authorization's state changes of the current user.
* Sets the login and sign up or log out buttons accordingly.
* Sets the log-in status message.
* It's been imported in in the login.html page.
*/

//listens for user authentication state changes and behave accordingly.
auth.onAuthStateChanged(user => {
    //if the user is logged in sets the login status message, removes the login and signup buttons.
    //inserts the logout button into the dom..
    if(user) {
        $("#login-message-insertion-point").html("");
        $("#login-status-message-insertion-point").html("");
        $("#login-status-message-insertion-point").html("You are logged In");
        $("#login-page-buttons-insertion-point").html("");
        $("#login-page-buttons-insertion-point").html("<button class='btn btn-secondary float-right' onclick='logout()' type='button'>Logout</button>");
    //if the user is not logged in sets the log-in status message. Removes the logout button.
    //inserts the login and signup buttons into the dom.
    } else {
        $("#login-message-insertion-point").html("");
        $("#login-status-message-insertion-point").html("");
        $("#login-status-message-insertion-point").html("You are Logged Out");
        $("#login-page-buttons-insertion-point").html("");
        $("#login-page-buttons-insertion-point").html("<button class='btn btn-secondary float-left' onclick='login()' id='btnLogin' type='button'>Login</button>" +
            "<button class='btn btn-secondary float-right' id='btnSignUp' type='button' onclick='signUp()'>Sign Up</button>");
    }
});

/**
 * The function perform user login operations.
 * Uses the functions validatePassword and validateEmail,
 * for user input validation.
 * It's been used in the login.html page, triggered by the login button.
 * 
 */

function login() {
    //recover the input fields and input fields values from the page
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    //white spaces at beginning and end of the input value are removed 
    let email=emailInput.value.trim();
    let password=passwordInput.value.trim();
    //validates the email field, return a message in case of error.
    let message = validateEmail(email);
    //on errors the error message is injected in the dom
    if(message) {
        $("#login-message-insertion-point").html("");
        $("#login-message-insertion-point").html("<div class='alert alert-danger p-2'>" +
            message + "</div>");
        return;
    }
    //validates the password input field value returns a message in case of errors.
    message = validatePassword(password);
    //on errors the error message is injected in the dom
    if(message) {
        $("#login-message-insertion-point").html("");
        $("#login-message-insertion-point").html("<div class='alert alert-danger p-2'>" +
            message + "</div>");
        return;
    } 
    //performs logs-in to firebase.
    let promise = auth.signInWithEmailAndPassword(email, password);
    //on errors retrieves the error message and inserts it in the dom.
    promise.catch(e => {$("#login-message-insertion-point").html("");
        $("#login-message-insertion-point").html("<div class='alert alert-danger p-2'>" +
            e.message + "</div>")});
    promise.then(cred => {
        if(cred) {
            //validates the session cookie
            document.cookie="validSession=true";
            //resets emai and password user input
            fieldReset(emailInput);
            fieldReset(passwordInput);
        }
    });
}

