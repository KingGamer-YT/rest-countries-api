// Function to get country data from the API
fetchCountries = async () => {
    // Get data from the REST Countries API
    const response = await fetch('https://restcountries.com/v2/all');
    // Convert the response to JSON format
    const myJson = await response.json();
    // Show the JSON data in the console
    console.log(myJson);
    // Save the JSON data in the browser's local storage
    localStorage['jsonData'] = JSON.stringify(myJson);

    // Set a point here to stop and check for debugging
    debugger

    // Loop through each country in the data
    for (var i = 0; i < myJson.length; i++) {
        // Create a new <div> for each country
        const div = document.createElement('div');
        // Add a class to style the country div
        div.classList.add('country-item');

        // Create an <img> element for the country's flag
        const img = document.createElement('img');
        // Add a class for flag styling
        img.classList.add('flag');
        // Set the image source to the country's flag URL
        img.setAttribute('src', myJson[i].flag);
        // Set an alternative text for the image
        img.setAttribute('alt', "flag-img");

        // Create an <h3> element to show the country's name
        const h3 = document.createElement('h3');
        // Set the name inside the <h3>
        h3.textContent = myJson[i].name;

        // List of labels for the country's details
        var li_list = ["Population", "Region", "Capital"];
        // List of values for the country's details
        var li_values = [myJson[i].population, myJson[i].region, myJson[i].capital];

        // Create a <ul> element to hold the details
        const ul = document.createElement('ul');

        // Loop through the details to create list items
        for (var j = 0; j < li_list.length; j++) {
            // Create a <li> for each detail
            const li = document.createElement('li');
            // Set text for the list item with the label and value
            li.textContent = li_list[j] + ": " + li_values[j];
            // Add the <li> to the <ul>
            ul.appendChild(li);
        }

        // Add the flag image, country name, and details to the main <div>
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(ul);

        // Add a click event to show more details about the country
        div.addEventListener('click', function (e) {
            displayCountryDetails(e, myJson);
        })

        // Find the container where all countries will be displayed
        var c_box = document.querySelector('#countries-box');
        // Add the country <div> to the container
        c_box.appendChild(div);

        // Uncomment these lines if you want to stop after showing 10 countries
        // if (i === 10) {
        //     return;
        // }
    }

    // Show the container in the console for debugging
    console.log(c_box);
}

// Call the function to fetch and display countries
fetchCountries();

// Debugger to pause the code here
debugger

// Get the search input field and listen for key presses
const search = document.forms['input-form'].querySelector('input');
search.addEventListener('keyup', function (e) {
    // Get the search term and convert it to lowercase
    const searchTerm = e.target.value.toLowerCase();
    // Get all country name elements (<h3> tags)
    const countries = document.getElementsByTagName('h3');

    // Reset the dropdown menu to its default option
    document.getElementById('regions').selectedIndex = 0;

    // Loop through all country names to filter based on search term
    Array.from(countries).forEach(function (country) {
        // Check if the country name includes the search term
        if (country.innerText.toLowerCase().indexOf(searchTerm) != -1) {
            // Show the country if it matches the search
            country.parentElement.style.display = "block";
        } else {
            // Hide the country if it doesn't match
            country.parentElement.style.display = "none";
        }
    })
})

// Function to filter countries by region using dropdown
function selectRegions() {
    // Get the dropdown menu for regions
    const list = document.getElementById('regions');
    // Pause code execution here for debugging
    debugger

    // Clear the search input
    document.getElementById('search').value = "";

    // Get the selected region from the dropdown
    const selected_region = list.options[list.selectedIndex].text.toLowerCase();

    // Get all list items (<li>) to check their region
    const regions = document.getElementsByTagName('li');

    // Loop through the list items, checking every third item (regions)
    for (var i = 1; i < regions.length; i += 3) {
        // If the region matches the selected region, show it
        if (regions[i].innerText.toLowerCase().indexOf(selected_region) != -1) {
            regions[i].parentElement.parentElement.style.display = "block";
        } else {
            // Otherwise, hide it
            regions[i].parentElement.parentElement.style.display = "none";
        }
    }

    // Show the list in the console for debugging
    console.log(list);
}

// Function to toggle between light and dark themes
function toggleTheme() {
    // Pause here for debugging
    debugger

    // Get the current theme (light or dark)
    var currentTheme = document.documentElement.getAttribute('data-theme');
    // Get the text element for theme mode
    var text = document.getElementById('dark-mode-text');

    // Check if the theme is light
    if (currentTheme === 'light') {
        // Switch to dark theme
        targetTheme = 'dark';
        // Change the text to "Light Mode"
        text.innerText = "Light Mode";
        // Change the icon to a sun
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'sunny-outline');
    } else if (currentTheme === 'dark') {
        // Switch to light theme
        targetTheme = 'light';
        // Change the text to "Dark Mode"
        text.innerText = "Dark Mode";
        // Change the icon to a moon
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'moon-outline');
    }

    // Apply the new theme to the document
    document.documentElement.setAttribute('data-theme', targetTheme);
}

// Function to display more details about a selected country
function displayCountryDetails(e, myJson) {
    // Get the main and details sections
    var main = document.getElementsByClassName('main');
    var section = document.getElementsByClassName('details-section');

    // Pause here for debugging
    debugger

    // Check if the clicked element is an image, name, or list
    if (e.target.tagName === "IMG" || e.target.tagName === "H3" || e.target.tagName === "UL") {
        // Get the parent element (country <div>)
        var parent = e.target.parentElement;
        var children = parent.children;
        // Hide the main section and show the details section
        main[0].style.display = "none";
        section[0].style.display = "block";

        // Set data for the selected country
        setData(myJson, children, section, false);
    } else if (e.target.tagName === "LI") {
        // Get the parent <div> for the <li> element
        var parent = e.target.parentElement.parentElement;
        var children = parent.children;
        // Hide the main section and show the details section
        main[0].style.display = "none";
        section[0].style.display = "block";

        // Set data for the selected country
        setData(myJson, children, section, false);
    }
}

// Function to set the details of the selected country
function setData(myJson, children, section, recursion) {
    // Pause here for debugging
    debugger
    // Get the grid element for text details
    var textgrid = document.getElementsByClassName('text-grid');
    // Make the grid visible
    textgrid[0].style.display = "grid";

    // Loop through all countries in the data
    for (var i = 0; i < myJson.length; i++) {
        // Check if the country name matches the selected one
        if (myJson[i].name.toLowerCase() === (recursion ? children.toLowerCase() : children[1].innerText.toLowerCase())) {
            // Set the name, flag, and other details in the details section
            section[0].querySelectorAll('h3')[0].innerText = myJson[i].name;
            section[0].querySelectorAll('img')[0].src = myJson[i].flag;
            section[0].querySelectorAll('img')[0].alt = "flag-image";
            section[0].querySelectorAll('.native-name')[0].innerText = myJson[i].nativeName;
            section[0].querySelectorAll('.region')[0].innerText = myJson[i].region;

            // If the capital exists, set it; otherwise, leave blank
            if(myJson[i] && myJson[i].capital){
                section[0].querySelectorAll('.capital')[0].innerText = myJson[i].capital;
            } else {
                section[0].querySelectorAll('.capital')[0].innerText = "";
            }
            
            // If currencies exist, set the currency; otherwise, leave blank
            if(myJson[i] && myJson[i].currencies){
                section[0].querySelectorAll('.currencies')[0].innerText = myJson[i].currencies[0].name;
            } else {
                section[0].querySelectorAll('.currencies')[0].innerText = "";
            }

            // Set population, sub-region, top-level domain, and languages
            section[0].querySelectorAll('.population')[0].innerText = myJson[i].population;
            section[0].querySelectorAll('.sub-region')[0].innerText = myJson[i].subregion;
            section[0].querySelectorAll('.tld')[0].innerText = myJson[i].topLevelDomain[0];
            section[0].querySelectorAll('.languages')[0].innerText = myJson[i].languages[0].name;

            // Get neighboring country codes
            var nearbyCountryCodes = myJson[i].borders;
            var nearbyCountries = [];

            // Pause here for debugging
            debugger

            // If borders exist, find the neighboring countries
            if(myJson[i] && myJson[i].borders){
                for (var j = 0; j < myJson.length; j++) {
                    for (k = 0; k < nearbyCountryCodes.length; k++) {
                        if (myJson[j].alpha3Code === nearbyCountryCodes[k]) {
                            nearbyCountries.push(myJson[j].name);
                        }
                    }
                }
            } else {
                // If no borders, add a placeholder message
                nearbyCountries.push("I do not have any borders!");
            }

            // Get the <ul> for neighboring countries
            const ul = document.getElementById('neighboring-countries');
            // Clear the list of neighboring countries
            ul.innerHTML = '';

            // Uncomment these lines if you want to exit early when no neighbors
            // if(nearbyCountryCodes.length === 0) {
            //     return;
            // }

            // Loop through the neighboring countries to add to the list
            for (var j = 0; j < nearbyCountries.length; j++) {
                // Create a <li> for each neighboring country
                var li = document.createElement('li');
                li.textContent = nearbyCountries[j];

                // Add a click event to each <li> to show details for the neighboring country
                li.addEventListener('click', function (e) {
                    // Call setData with the neighboring country's name
                    setData(myJson, e.target.innerText, section, true);
                })

                // Add the <li> to the <ul>
                ul.appendChild(li);
            }

            // Show neighboring countries in the console for debugging
            console.log(nearbyCountries);
        }
    }
}

// Function to go back to the main country list view
function back() {
    // Get the main and details sections
    const main = document.getElementsByClassName('main');
    const section = document.getElementsByClassName('details-section');

    // Hide the details section and show the main section
    section[0].style.display = "none";
    main[0].style.display = "block";
}
