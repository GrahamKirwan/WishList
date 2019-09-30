window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position=>{
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(lat + " " + long);

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/b5742bb3593d8de43cb7bc8e09b06ddc/${lat},${long}`

            fetch(api).then(response => {
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;
                //Set DOM Elements from the API
                const celsius = (temperature - 32)*5/9;
                
                temperatureDegree.textContent = Math.round(celsius);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Set icon
                setIcons(icon, document.querySelector('.icon'));
            });
        });
    } 

    function setIcons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, skycons[currentIcon]);
    }

});