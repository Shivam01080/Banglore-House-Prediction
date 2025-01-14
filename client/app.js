function getBathValue(){
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms){
        if(uiBathrooms[i].checked){
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function getBHKValue(){
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i) + 1;
        }
    }
    return -1;
}


function onClickedEstimatedPrice(){
    console.log("Estimate Price Button Clicked!!!");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bath = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url, {
        total_sqft : parseFloat(sqft.value),
        bhk : bhk,
        bath : bath,
        location : location.value
    }, function(data, status){
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + "Lacs</h2>";
        console.log(status);
    })
}


function onPageLoad() {
    console.log("Document loaded");

    var url = "http://127.0.0.1:5000/get_location"; 
    $.get(url, function(data, status) {
        console.log("Response received for get-location");

        if (data && data.locations) {
            var locations = data.locations;
            var $uiLocations = $('#uiLocations'); 
            
            $uiLocations.empty(); 

            for (var i in locations) {
                var opt = new Option(locations[i]);
                $uiLocations.append(opt);
            }
        } else {
            console.log("No locations found in the response.");
        }
    }).fail(function() {
        console.log("Error: Could not fetch data from the backend.");
    });
}

window.onload = onPageLoad;
