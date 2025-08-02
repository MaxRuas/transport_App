
let map, userMarker, zurichCircle;

function initMap() {
    const zurichCenter = { lat: 47.3769, lng: 8.5417 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: zurichCenter,
    });
    
    zurichCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: zurichCenter,
        radius: 5000, // dummy zone radius for Zurich 110
    });

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(updatePosition);
    } else {
        document.getElementById("status").innerText = "Geolocation is not supported by this browser.";
    }
}

function updatePosition(position) {
    const userPos = { lat: position.coords.latitude, lng: position.coords.longitude };
    
    if (!userMarker) {
        userMarker = new google.maps.Marker({ position: userPos, map, title: "You" });
    } else {
        userMarker.setPosition(userPos);
    }

    const inside = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(userPos.lat, userPos.lng),
        zurichCircle.getCenter()
    ) <= zurichCircle.getRadius();

    document.getElementById("status").innerText = inside ? "Inside Zurich Zone 110" : "Outside Zurich Zone 110";
}
