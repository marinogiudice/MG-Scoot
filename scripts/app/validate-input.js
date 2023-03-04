
/**
 * 
 * The scripts contains the functions used to handle user' input validation
 * of the email addresss and the password used for user registration and login.  
 * Iused the same scripts of my javascript module fma of the last year with some modifications.
 */

//resets the input field, takes the input field to reset as parameter.
function fieldReset(input) {
    input.value="";
}


//validates the email user input, takes the entered email as parameter.
//returns a the error message on error, false otherwise.
function validateEmail(email) {
	//gets the username input field value
	email=email.trim();
	//define the valid pattern
	let pattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
	//if the input doesn't match the given pattern
	if(!(pattern.test(email))) {
		return("Please insert a valid email address");
	}
	//if the username length > 40 characters
	if(email.length > 40) {
		return("Max Username length 40 characters");
		
	}
	return false;
}

//validates the password user input, takes the entered password as parameter.
//returns a the error message on error, false otherwise.
function validatePassword(pass) {
	//gets the value of the password input.
	
	pass=pass.trim();
	//if the password doesn't contain a lower case letter.
	if (!pass.match(/[a-z]/g)) {
		return("Password must contain at least one lower case letter");
		
	}
	//if the password doesn't contain an upper case letter
	if (!(pass.match(/[A-Z]/g))) {
		return("Password must contain at least one upper case letter");
	}
	//if the password doesn't contain a numeric character
	if (!(pass.match(/[0-9]/g))) {
		return("Password must contain at least one number");
	}
	//check for white space
	if (pass.match(/[" "]/g)) {
		return("No White Spaces Please");
	}
	//if the password length is not greater than 7
	if (!(pass.length > 7)) {
        console.log(pass.length);
		return("Password at least 8 characters");
	}
	
	return false;
}

