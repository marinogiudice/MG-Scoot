
/** 
* The Script Initialitize the Firebase Framework.
* It is imported in all the pages that require Firebase Functionalities.
*
*/

// Declares firebase configuration parameters.
const firebaseConfig = {
    apiKey: "AIzaSyDqV5v6eraKdVi02I2u7baUDRpOXMPDgTw",
    authDomain: "mwafma-405fe.firebaseapp.com",
    databaseURL: "https://mwafma-405fe-default-rtdb.firebaseio.com",
    projectId: "mwafma-405fe",
    storageBucket: "mwafma-405fe.appspot.com",
    messagingSenderId: "895000964503",
    appId: "1:895000964503:web:2134224d52e178b9afe8d2"
};

//initialitize firebase app components.
firebase.initializeApp(firebaseConfig);