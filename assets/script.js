/** ----------------PSUEDO CODE FOR MAIN PAGE-----------------

Once the page loads i enter my keyword into the search box and hit submit
-- If no results are found a message is presented on the web page
-- Need to determine how to to pass values outside of API or need to clear specific items in local storage and keep search history for longer. 

My search is passed into the Met API search
-- search criteria is passed into initial MET API and the object IDs are stored into an array
-- a random object ID is selected and passed into the second MET API and the detailed results are stored into an object
---- Date
---- Location in museum
---- Period Type
---- Image
---- Name of Artist
---- Title of piece/work
---- Rights and Reproduction

-- API Parameters:g
----HAS IMAGE

//maps
https://maps.metmuseum.org/galleries/fifth-ave/2/822

The results are displayed on the screen

 */
var objectIds = [];
var objectID = 0;
var myHeaders = new Headers();
myHeaders.append("Cookie", "incap_ses_208_1662004=wtUiUDkio3mJwBg7C/fiAsPsHWAAAAAAHxEusp5NdaZhKLNQkhNvkw==; visid_incap_1662004=yWfsog6jQna1Q6+jh2eZPSBmG2AAAAAAQUIPAAAAAADi+cYxvBpgB+yJk2PSo8a7");
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};


//-----------THIS FUNCTION, when called, executes API GETS and sets values.--------------------------//
function getAPI(searchString) {
    //Clearing Local Storage before the 
    localStorage.clear("objectIDs");

    //console.log("I made it!!");
    //----------------pulled from POSTMAN-----------------------//
    //---additional parameter added to only return object IDs that have images (would be silly to have facts without someothing pretty to show)---//
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&q=${searchString}`, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            objectIds = data.objectIDs;
            var choseID = Math.floor(Math.random() * objectIds.length)
            //console.log(objectIds[choseID]);
            localStorage.setItem("objectIDs", objectIds[choseID])
            //console.log(objectIds);
            getDetails();
        })
        .catch(error => console.log('error', error));

};

function getDetails() {
    objectID = parseInt(localStorage.getItem("objectIDs"));
    //-------------COPIED FROM POSTMAN---------------------//
    // - Second Function call using the object ID obtained fromthe prior inquiry - //
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayResults(data);
        })
        .catch(error => console.log('error', error));
};

function displayResults(data) {
    //console.log(data);

    var objectDate = data.objectDate;
    console.log(objectDate);
    //--obtained from Gallery Number - correlates to place in Museum--//
    var locationInMuseum = data.GalleryNumber;
    console.log(locationInMuseum);

    var periodType = data.period;
    console.log(periodType);
    var artistName = data.artistDisplayName;
    console.log(artistName);
    var workTitle = data.title;
    //console.log(workTitle);
    var rightsReproduction = data.rightsAndReproduction;
    //console.log(rightsReproduction);
    var learnMore = data.objectWikidata_URL;
    //console.log(learnMore);
    var imageURL = data.primaryImage;
    //console.log(imageURL);
    var medium = data.medium;
    //console.log(medium);



};