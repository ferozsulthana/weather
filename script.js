let searchInputEle = document.getElementById('search-input');
let tempEle = document.getElementById('temp-value');
let locEle = document.getElementById('location');
let weatherDescEle = document.getElementById('weather-desc');
let btnEle = document.getElementById('btn');

const apikey = '43b8cc5be72bf782d1ad882f575bf36e';

btnEle.onclick = function() {
    const loc = searchInputEle.value.trim(); // Trim whitespace from input
    if (loc === "") {
        alert('Please Enter some Location');
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(loc)}&appid=${apikey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Location not found: ${response.statusText}`); // More detailed error message
            }
            return response.json();
        })
        .then(data => {
            const { name } = data;
            const { humidity, temp } = data.main;
            const { description } = data.weather[0];

            tempEle.innerText = `${temp} °C`; // Display temperature
            locEle.innerText = name;
            weatherDescEle.innerText = description;
        })
        .catch(error => {
            alert(error.message); // Display the error message to the user
        });

    searchInputEle.value = ""; // Clear the input field
};
