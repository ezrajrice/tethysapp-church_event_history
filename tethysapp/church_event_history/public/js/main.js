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
    source: new ol.source.KML({
        projection: projection,
        url: '../../data/kml/points.kml'
    })
});

var lines = new ol.layer.Vector({
    source: new ol.source.KML({
        projection: projection,
        url: '../../data/kml/lines.kml'
    })
});

var poly = new ol.layer.Vector({
    source: new ol.source.KML({
        projection: projection,
        url: '../../data/kml/poly.kml'
    })
});

//Declare the map object
var map = new ol.Map({
    target: 'map',

    //set up the layers that will be loaded in the map
    layers: [raster, points, lines, poly],

    //Establish the view area.  Reproject Bing maps to Web Mercator
    view: new ol.View({
        center: ol.proj.transform([-94.3502343, 46.829781], 'EPSG:4326', 'EPSG:3857'),
        zoom: 13
    })
});
