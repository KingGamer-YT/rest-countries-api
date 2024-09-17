// Retrieve the stored JSON data from local storage
jsonData = localStorage['jsonData'];

// Commented out console logs for debugging the JSON data
// console.log("json");
// console.log(JSON.parse(jsonData));

// Parse the JSON data into a JavaScript object
var countriesData = JSON.parse(jsonData);

// Loop through the array of countries
for (var i = 0; i < countriesData.length; i++) {
    // Log the name of each country to the console
    console.log(countriesData[i].name);
}
