/**
 * The scripts retrieves the guide information from the firebase realtime database.
 *  
 */

function getGuides() {
    //used to check if the element is the first in the snap inorder to set the active class attribute 
    //used for the carousel item.
    let count=0;
    //creates a reference to the firebase realtime database, guides "table"
    let guidesRef = firebase.database().ref('guides');
    //orders the guides alphabetically by last name
    guidesRef.orderByChild("lastName").on("child_added", snap => {
        //set things up for the active element of the carousel
        let active = "";
        count++;
        if (count == 1) {
            active="active";
        }
        //restricts the results to "blue badge only"
        if(snap.child("blueBadge").val() === "Yes") {
            //creates the full name
            let fullName = snap.child("firstName").val() + " " + snap.child("lastName").val();
            //inserts the obtained results in the dom.
            $("#guides-insertion-point").append(
                "<div class='carousel-item " + active + "'><div class='row mt-2 mt-md-0'><div class='col-md-6 d-none d-md-flex flex-md-column text-center'><img class='img-fluid' src='media/guide-placeholder-image.jpg' alt='guide-image'></div><article class='col-md-6 d-flex-column mb-3'><p>Name: " + 
                fullName  + "</p><p>Age: " +
                snap.child("age").val() + "</p><p>Tours: " +
                snap.child("tours").val() + "</p><p>Occupation: " + 
                snap.child("occupation").val() + "</p><p>Blue Badge: " +
                snap.child("blueBadge").val() + "</p></article></div></div>");
        }
    });
}

//calls the getGuides function when the pages loads.
window.onload = getGuides;
