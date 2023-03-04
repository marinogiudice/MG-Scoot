/**
 * The function perform user registration operations.
 * Uses the functions validatePassword and validateEmail,
 * for user input validation.
 * It's been used in the login.html page, triggered by the sign up Button.
 * 
 */

function signUp() {
    //recover the input fields and input fields values from the page
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    //white spaces at beginning and end of the input value are removed 
    let email=emailInput.value.trim();
    let password=passwordInput.value.trim();
    //validates the email field, return a message in case of error.
    let message = validateEmail(email);
    //on errors the error message is injected in the page
    if(message) {
        $("#login-message-insertion-point").html("");
        $("#login-message-insertion-point").html("<div class='alert alert-danger p-2'>" +
            message + "</div>");
        return;
    }
    //validates the password input field value
    message = validatePassword(password);
    //on errors the error message is injected in the page
    if(message) {
        $("#login-message-insertion-point").html("");
        $("#login-message-insertion-point").html("<div class='alert alert-danger p-2'>" +
            message + "</div>");
        return;
    }
    //creates a new user firebase instance
    let promise = auth.createUserWithEmailAndPassword(email, password);
    //on errors retrieves the error message and displays it on the page.
    promise.catch(e => {$("#login-message-insertion-point").html("");
        $("#login-message-insertion-point").html("<div class='alert alert-danger p-2'>" +
            e.message + "</div>")});
        //if user creation is successful resets the input fields.
        promise.then(cred => {
        fieldReset(emailInput);
        fieldReset(passwordInput);

    });
}