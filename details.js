
jsonData = localStorage['jsonData'];
// console.log("json");
// console.log(JSON.parse(jsonData));

var countriesData = JSON.parse(jsonData);


for(var i=0;i<countriesData.length;i++){
    console.log(countriesData[i].name);
}