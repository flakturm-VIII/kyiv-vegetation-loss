const map = L.map("map", {
    zoomControl: true
}).setView([50.4501, 30.5234], 11);

map.createPane("basemap");
map.getPane("basemap").style.zIndex = 100;

map.createPane("satellite2016");
map.getPane("satellite2016").style.zIndex = 200;

map.createPane("satellite2025esri");
map.getPane("satellite2025esri").style.zIndex = 210;

map.createPane("satellite2025google");
map.getPane("satellite2025google").style.zIndex = 220;

map.createPane("overlay");
map.getPane("overlay").style.zIndex = 400;

const jawg = L.tileLayer(
    "https://tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=YOUR_JAWG_TOKEN",
    {
        attribution:
            "© Jawg Maps © OpenStreetMap contributors",
        pane: "basemap"
    }
);

const esriClarity = L.tileLayer(
    "https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Esri",
        pane: "satellite2016"
    }
);

const esriCurrent = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Esri",
        pane: "satellite2025esri"
    }
);

const googleSatellite = L.tileLayer(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
        attribution: "Google",
        pane: "satellite2025google"
    }
);

const vegetationLoss = L.tileLayer(
    "tiles/vegetation_loss/{z}/{x}/{y}.png",
    {
        opacity: 1,
        pane: "overlay"
    }
);

jawg.addTo(map);
vegetationLoss.addTo(map);

function bindLayerToggle(
    checkboxId,
    sliderId,
    layer
) {
    const checkbox =
        document.getElementById(checkboxId);

    const slider =
        document.getElementById(sliderId);

    checkbox.addEventListener("change", () => {

        if (checkbox.checked) {
            layer.addTo(map);
        } else {
            map.removeLayer(layer);
        }
    });

    slider.addEventListener("input", () => {

        layer.setOpacity(
            slider.value / 100
        );
    });
}

bindLayerToggle(
    "veg-loss",
    "veg-loss-opacity",
    vegetationLoss
);

bindLayerToggle(
    "google",
    "google-opacity",
    googleSatellite
);

bindLayerToggle(
    "esri-current",
    "esri-current-opacity",
    esriCurrent
);

bindLayerToggle(
    "esri-clarity",
    "esri-clarity-opacity",
    esriClarity
);

bindLayerToggle(
    "jawg",
    "jawg-opacity",
    jawg
);