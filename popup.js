// POPUP SCRIPT

// declare array for user input
var valueArray = [];


getData();


function getData() {
// get from storage
    chrome.storage.sync.get("Vegetarian", function (items) {
        // callback to add value(s), either stored or default
        if (items.length === 0) {
            console.log(valueArray);
            valueArray = ["Awesome"];
            } else {
                valueArray[0] = items.Vegetarian;
                console.log(valueArray);
            }
        // populate values in HTML form
        document.getElementById("vegetarian").value = valueArray[0];
    });
}


// Button, submit to update values
const submit = document.getElementById("submit");

submit.onclick = function(){
    var userInput = document.getElementById("vegetarian").value;
    //document.getElementById("output").innerText = userInput;

    console.log(userInput);
    chrome.storage.sync.set(
        {Vegetarian: userInput}, function () {
            console.group(userInput);
            chrome.tabs.executeScript({
            file: "content.js"
        });
    });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
    return false;
}


// Helpful thread for chrome storageArea
// https://stackoverflow.com/questions/40645538/communicate-data-from-popup-to-content-script-injected-by-popup-with-executescri/40666096
// stack overflow user Makyen: https://stackoverflow.com/users/3773011/makyen




