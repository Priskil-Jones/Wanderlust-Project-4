maptilersdk.config.apiKey = mapApiKey;

const map = new maptilersdk.Map({
    container: 'map',                            // container's id or the HTML element in which the SDK will render the map
    style: maptilersdk.MapStyle.STREETS,
    center: listingData.geometry.coordinates,                         // starting position [lng, lat]
    zoom: 8                                      // starting zoom
});

console.log(listingData.geometry.coordinates);

const el = document.createElement('div');                             //Imagine el = Pikachu Icon
    el.style.backgroundImage = "url('/images/PikachuIcon.png')"
    el.style.width = "60px";
    el.style.height = "60px";
    el.style.backgroundSize = "contain";
    el.style.backgroundRepeat = "no-repeat";
    el.style.cursor = "pointer";

const marker = new maptilersdk.Marker({ element: el, draggable: true })
  .setLngLat(listingData.geometry.coordinates)    //listing.geometry.coordinates

  .setPopup(new maptilersdk.Popup({offset: 25})
  .setHTML(`<h4>${listingData.title}</h4> <p>Exact location will be provided after booking</p>`))

  .addTo(map);