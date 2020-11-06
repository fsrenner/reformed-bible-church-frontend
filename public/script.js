const CONTACT_FORM_URL = 'http://localhost:3300/contact';

window.addEventListener('load', initializeMap);

$(document).ready(function () {
    $('#contactFormSubmit').click(function (e) {
        e.preventDefault();
        $.post(
            CONTACT_FORM_URL,
            {
                email: $('#email').val(),
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                phoneNumber: $('#phoneNumber').val(),
                message: $('#message').val()
            },
            function(data) {
                console.log(data);
            },
            'application/json'
        );
        // $.ajax({
        //     url: CONTACT_FORM_URL,
        //     type: 'POST',
        //     dataType: 'application/json',
        //     data: {
        //         email: $('#email').val(),
        //         firstName: $('#firstName').val(),
        //         lastName: $('#lastName').val(),
        //         phoneNumber: $('#phoneNumber').val(),
        //         message: $('#message').val()
        //     },
        //     error: function (err) {
        //         alert(error);
        //     },
        //     success: function(data) {
        //         alert(data);
        //     }
        // });
    });
});

function initializeMap() {
    const center = (window.innerWidth > 580) ? [36.652032, -93.57193] : [36.6957695, -93.405762];
    const kcLatAndLong = [36.615940, -93.406080];
    const accessToken = 'sk.eyJ1IjoiZnN0ZXZlcmVubmVyIiwiYSI6ImNraDIyc2pocTAwbzcycXFyd3hhMHkwN3EifQ.v1hz9oxAyWEVITUNZIqOZg';
    const light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken
    });
    const streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken
    });
    const rbcLoc = L.marker(kcLatAndLong).bindPopup('280 Old Still Rd, Kimberling City, MO 65686');
    const city = L.layerGroup([rbcLoc]);
    const mymap = L.map('mapid', {
        center: center,
        zoom: 10.5,
        layers: [light, city]
    });
    const baseMaps = {
        "<span style='color: gray'>grayscale</span>": light,
        'streets': streets
    };
    const overlayMaps = {
        'cities': city
    }
    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
}

function maxZIndex() {
    return Array.from(document.querySelectorAll('body *'))
          .map(a => parseFloat(window.getComputedStyle(a).zIndex))
          .filter(a => !isNaN(a))
          .sort()
          .pop();
}