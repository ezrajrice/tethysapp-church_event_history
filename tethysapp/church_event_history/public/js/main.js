"use strict";

//Declaring the projection object for Web Mercator
var projection = ol.proj.get('EPSG:3857');

//Declare the raster layer as a separate object to put in the map later
var raster = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            imagerySet: 'Aerial',
            key: 'AibYXOo904rZZUxhY9JnsIpnBqWidvqH_g_oYdgPGjuLe-QfCm1syiC47O6j3yBh'
        })
});

//create another layer from a kml file
var points = new ol.layer.Vector({
    source: new ol.source.Vector({
        projection: projection,
        url: '/static/church_event_history/kml/points.kml',
        format: new ol.format.KML()
    })
});

var lines = new ol.layer.Vector({
    source: new ol.source.Vector({
        projection: projection,
        url: '/static/church_event_history/kml/lines.kml',
        format: new ol.format.KML()
    })
});

var poly = new ol.layer.Vector({
    source: new ol.source.Vector({
        projection: projection,
        url: '/static/church_event_history/kml/poly.kml',
        format: new ol.format.KML()
    })
});

//Declare the map object
var map = new ol.Map({
    target: 'map',

    //set up the layers that will be loaded in the map
    layers: [raster, poly, lines, points],

    //Establish the view area.  Reproject Bing maps to Web Mercator
    view: new ol.View({
        center: ol.proj.transform([-74.3502343, 42.829781], 'EPSG:4326', 'EPSG:3857'),
        zoom: 5
    })
});

var popup_container = $('#popup');
var popup_content = $('#popup-content');

var info_container = $('#feature-info');
var info_content = $('#feature-info-content');

var popup = new ol.Overlay({
    element: document.getElementById('popup'),
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -25]
});
map.addOverlay(popup);

// display popup on click
map.on('click', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
            return feature;
        });

    if (feature) {
        var coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);

        // Construct the innerHTML from the feature's metadata
        var feature_id = feature.a;
        var site_name = feature.get('site');
        var description = feature.get('info');
        var link = '<a href="' + feature.get('link') + '">Learn more</a>';
        var image_ref = '/static/church_event_history/images/' + feature_id + '.png';
        var popup_meta = site_name + '<br>' + link;
        var feature_meta = site_name + '<br><img src="' + image_ref + '"><br>' + description + '<br>' + link;



        info_content.html(feature_meta);
        popup_content.html(popup_meta);
        popup_content.addClass('show');
    } else {
        info_content.html('');
        popup_content.toggleClass('show');
    }
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
    if (e.dragging) {
        info_content.html('');
        popup_content.removeClass('show');
        return;
    }
});
