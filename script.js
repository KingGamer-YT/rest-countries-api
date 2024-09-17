// This function fetches the list of countries from an API
fetchCountries = async () => {
    // Fetch the data from the API
    const response = await fetch('https://restcountries.com/v2/all');
    
    // Convert the fetched data to a JavaScript object
    const myJson = await response.json();
    
    // Log the fetched data to the console
    console.log(myJson);
    
    // Store the fetched data in the browser's local storage
    localStorage['jsonData'] = JSON.stringify(myJson);

    // Pause the execution for debugging
    debugger;

    // Loop through the array of countries
    for (var i = 0; i < myJson.length; i++) {
        // Create a new div element for each country
        const div = document.createElement('div');
        // Add a class to the div element
        div.classList.add('country-item');

        // Create an img element for the country's flag
        const img = document.createElement('img');
        // Add a class to the img element
        img.classList.add('flag');
        // Set the source attribute of the img element to the flag URL
        img.setAttribute('src', myJson[i].flag);
        // Set the alt attribute of the img element
        img.setAttribute('alt', "flag-img");

        // Create an h3 element for the country's name
        const h3 = document.createElement('h3');
        // Set the text content of the h3 element to the country's name
        h3.textContent = myJson[i].name;

        // Create a list of labels for the country's information
        var li_list = ["Population", "Region", "Capital"];
        // Create a list of values for the country's information
        var li_values = [myJson[i].population, myJson[i].region, myJson[i].capital];

        // Create a new ul element for the country's information
        const ul = document.createElement('ul');

        // Loop through the list of labels and values
        for (var j = 0; j < li_list.length; j++) {
            // Create a new li element for each piece of information
            const li = document.createElement('li');
            // Set the text content of the li element to the label and value
            li.textContent = li_list[j] + ": " + li_values[j];
            // Append the li element to the ul element
            ul.appendChild(li);
        }

        // Append the img, h3, and ul elements to the div element
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(ul);

        // Add an event listener to the div element for click events
        div.addEventListener('click', function (e) {
            // Call the displayCountryDetails function when the div is clicked
            displayCountryDetails(e, myJson);
        });

        // Select the element with the ID 'countries-box'
        var c_box = document.querySelector('#countries-box');
        // Append the div element to the 'countries-box' element
        c_box.appendChild(div);

        // Uncomment the following code if you want to stop after 10 countries
        // if (i === 10) {
        //     return;
        // }
    }

    // Log the 'countries-box' element to the console
    console.log(c_box);
}

// Call the fetchCountries function to fetch and display the countries
fetchCountries();

// Pause the execution for debugging
debugger;

// Select the input element within the form with the name 'input-form'
const search = document.forms['input-form'].querySelector('input');
// Add an event listener to the input element for keyup events
search.addEventListener('keyup', function (e) {
    // Get the value of the input element and convert it to lowercase
    const searchTerm = e.target.value.toLowerCase();
    // Get all the h3 elements (country names)
    const countries = document.getElementsByTagName('h3');

    // Reset the selected index of the 'regions' dropdown
    document.getElementById('regions').selectedIndex = 0;

    // Loop through the h3 elements
    Array.from(countries).forEach(function (country) {
        // Check if the country name includes the search term
        if (country.innerText.toLowerCase().indexOf(searchTerm) != -1) {
            // Display the parent element of the h3 element
            country.parentElement.style.display = "block";
        } else {
            // Hide the parent element of the h3 element
            country.parentElement.style.display = "none";
        }
    });
});

// Function to filter countries by region
function selectRegions() {
    // Select the element with the ID 'regions'
    const list = document.getElementById('regions');
    // Pause the execution for debugging
    debugger;

    // Clear the value of the search input element
    document.getElementById('search').value = "";

    // Get the selected region and convert it to lowercase
    const selected_region = list.options[list.selectedIndex].text.toLowerCase();

    // Get all the li elements
    const regions = document.getElementsByTagName('li');

    // Loop through the li elements starting from the second element (index 1)
    for (var i = 1; i < regions.length; i += 3) {
        // Check if the text content of the li element includes the selected region
        if (regions[i].innerText.toLowerCase().indexOf(selected_region) != -1) {
            // Display the grandparent element of the li element
            regions[i].parentElement.parentElement.style.display = "block";
        } else {
            // Hide the grandparent element of the li element
            regions[i].parentElement.parentElement.style.display = "none";
        }
    }

    // Log the 'regions' element to the console
    console.log(list);
}

// Function to toggle the theme between light and dark modes
function toggleTheme() {
    // Pause the execution for debugging
    debugger;

    // Get the current theme from the 'data-theme' attribute of the document element
    var currentTheme = document.documentElement.getAttribute('data-theme');
    // Select the element with the ID 'dark-mode-text'
    var text = document.getElementById('dark-mode-text');

    // Check if the current theme is 'light'
    if (currentTheme === 'light') {
        // Set the target theme to 'dark'
        targetTheme = 'dark';
        // Set the text content of the 'dark-mode-text' element to "Light Mode"
        text.innerText = "Light Mode";
        // Set the name attribute of the ion-icon element to 'sunny-outline'
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'sunny-outline');
    } else if (currentTheme === 'dark') {
        // Set the target theme to 'light'
        targetTheme = 'light';
        // Set the text content of the 'dark-mode-text' element to "Dark Mode"
        text.innerText = "Dark Mode";
        // Set the name attribute of the ion-icon element to 'moon-outline'
        document.getElementsByTagName('ion-icon')[0].setAttribute('name', 'moon-outline');
    }

    // Set the 'data-theme' attribute of the document element to the target theme
    document.documentElement.setAttribute('data-theme', targetTheme);
}

// Function to display more details about a country when clicked
function displayCountryDetails(e, myJson) {
    // Pause the execution for debugging
    debugger;

    // Select the elements with the class 'main' and 'details-section'
    var main = document.getElementsByClassName('main');
    var section = document.getElementsByClassName('details-section');

    // Check if the clicked element is an image, heading, or list
    if (e.target.tagName === "IMG" || e.target.tagName === "H3" || e.target.tagName === "UL") {
        // Select the parent element of the clicked element
        var parent = e.target.parentElement;
        // Get the child elements of the parent element
        var children = parent.children;

        // Hide the main section
        main[0].style.display = "none";
        // Show the details section
        section[0].style.display = "block";

        // Call the setData function to fill the details section with data
        setData(myJson, children, section, false);
    } else if (e.target.tagName === "LI") {
        // Check if the clicked element is a list item
        var parent = e.target.parentElement.parentElement;
        var children = parent.children;

        // Hide the main section
        main[0].style.display = "none";
        // Show the details section
        section[0].style.display = "block";

        // Call the setData function to fill the details section with data
        setData(myJson, children, section, false);
    }
}

// Function to set the data in the details section
function setData(myJson, children, section, recursion) {
    // Pause the execution for debugging
    debugger;

    // Select the element with the class 'text-grid'
    var textgrid = document.getElementsByClassName('text-grid');
    // Set the display style of the 'text-grid' element to 'grid'
    textgrid[0].style.display = "grid";

    // Loop through the array of countries
    for (var i = 0; i < myJson.length; i++) {
        // Check if the country's name matches the clicked country's name
        if (myJson[i].name === children[1].innerText) {
            // Set the flag image source and alternate text
            section[0].children[0].children[0].children[0].setAttribute('src', myJson[i].flag);
            section[0].children[0].children[0].children[0].setAttribute('alt', "flag-img");
            // Set the country name
            section[0].children[0].children[0].children[1].innerText = myJson[i].name;

            // Set the country's native name
            document.getElementById('native-name').innerText = myJson[i].nativeName;
            // Set the country's population
            document.getElementById('population').innerText = myJson[i].population;
            // Set the country's region
            document.getElementById('region').innerText = myJson[i].region;
            // Set the country's sub-region
            document.getElementById('sub-region').innerText = myJson[i].subregion;
            // Set the country's capital
            document.getElementById('capital').innerText = myJson[i].capital;
            // Set the country's top-level domain
            document.getElementById('domain').innerText = myJson[i].topLevelDomain[0];
            // Set the country's currencies
            document.getElementById('currency').innerText = myJson[i].currencies[0].name;
            // Set the country's languages
            document.getElementById('languages').innerText = myJson[i].languages.map(language => language.name).join(', ');

            // Get the codes of the neighboring countries
            let country_codes = myJson[i].borders;

            // Check if the country has no neighboring countries
            if (!country_codes) {
                // Hide the neighboring countries text
                document.getElementById('neighbours-text').style.display = "none";
                // Hide the neighboring countries grid
                document.getElementsByClassName('text-grid')[1].style.display = "none";
            } else {
                // Show the neighboring countries text
                document.getElementById('neighbours-text').style.display = "block";
                // Show the neighboring countries grid
                document.getElementsByClassName('text-grid')[1].style.display = "grid";
            }

            // Loop through the neighboring country codes
            for (let j = 0; j < country_codes.length; j++) {
                // Get the neighboring country code
                let neighbouring_country_data = country_codes[j];

                // Loop through the array of countries
                for (let k = 0; k < myJson.length; k++) {
                    // Check if the country's code matches the neighboring country code
                    if (neighbouring_country_data === myJson[k].alpha3Code) {
                        // Create a new div element for the neighboring country
                        var div = document.createElement('div');
                        // Create an img element for the neighboring country's flag
                        var img = document.createElement('img');
                        // Create an h3 element for the neighboring country's name
                        var h3 = document.createElement('h3');

                        // Set the flag image source and alternate text
                        img.setAttribute('src', myJson[k].flag);
                        img.setAttribute('alt', "flag-img");
                        // Set the text content of the h3 element to the neighboring country's name
                        h3.innerText = myJson[k].name;

                        // Append the img and h3 elements to the div element
                        div.appendChild(img);
                        div.appendChild(h3);

                        // Add a class to the div element
                        div.classList.add('neighbouring-country');

                        // Add an event listener to the div element for click events
                        div.addEventListener('click', function (e) {
                            // Hide the main section
                            main[0].style.display = "none";
                            // Show the details section
                            section[0].style.display = "block";

                            // Select the parent element of the clicked element
                            var parent = e.target.parentElement;
                            // Get the child elements of the parent element
                            var children = parent.children;

                            // Call the setData function to fill the details section with data
                            setData(myJson, children[1].innerText, section, true);
                        });

                        // Select the element with the ID 'neighbouring-countries'
                        var neighbour_div = document.getElementById('neighbouring-countries');
                        // Append the div element to the 'neighbouring-countries' element
                        neighbour_div.appendChild(div);
                    }
                }
            }
        }
    }
}

// Function to go back to the main section
function backToMain() {
    // Pause the execution for debugging
    debugger;

    // Select the elements with the class 'main' and 'details-section'
    var main = document.getElementsByClassName('main');
    var section = document.getElementsByClassName('details-section');

    // Select the element with the ID 'neighbouring-countries'
    var neighbour_div = document.getElementById('neighbouring-countries');
    // Clear the inner HTML of the 'neighbouring-countries' element
    neighbour_div.innerHTML = '';

    // Show the main section
    main[0].style.display = "block";
    // Hide the details section
    section[0].style.display = "none";
}
