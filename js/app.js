const map = L.map("map", {
    zoomControl: true
}).setView([50.4501, 30.5234], 11);

const jawg = L.tileLayer(
    "https://tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=YOUR_JAWG_TOKEN",
    {
        attribution:
            "© Jawg Maps © OpenStreetMap contributors"
    }
);

const esriClarity = L.tileLayer(
    "https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Esri"
    }
);

const esriCurrent = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Esri"
    }
);

const googleSatellite = L.tileLayer(
    "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
        attribution: "Google"
    }
);

const vegetationLoss = L.tileLayer(
    "tiles/vegetation_loss/{z}/{x}/{y}.png",
    {
        opacity: 1
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