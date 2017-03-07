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
    }),
//    eventListeners:{
//		'featureselected': function(evt){
//			var feature = evt.feature;
//			var popup = new ol.Popup.FramedCloud("popup",
//				ol.LonLat.fromString(feature.geometry.toShortString()) ,
//				null,
//				"<div style='font-size:.8em'>Feature: " + feature.id + "<br>Foo: " + feature.attributes.foo+"</div>",
//				null,
//				true
//			);
//			feature.popup = popup;
//			map.addPopup(popup);
//		},
//		'featureunselected':function(evt){
//		    console.log('feature unselected');
//			var feature = evt.feature;
//			map.removePopup(feature.popup);
//			feature.popup.destroy();
//			feature.popup = null;
//		}
//	}
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

var popup_container = document.getElementById('popup');
var popup_content = document.getElementById('popup-content');

var popup = new ol.Overlay({
    element: popup_container,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -25]
});
map.addOverlay(popup);

// display popup on click
map.on('click', function(evt) {
//    var element = popup.getElement();
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature, layer) {
            return feature;
        });

    if (feature) {
        var coordinates = feature.getGeometry().getCoordinates();
//        $(element).popover('destroy');
        popup.setPosition(coordinates);
        popup_content.innerHTML = feature.get('name');
//        $(element).popover({
//            'placement': 'top',
//            'html': true,
//            'content': feature.get('name')
//        });
        $(popup_container).popover('show');
    } else {
        $(element).popover('destroy');
    }
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
    if (e.dragging) {
      $(element).popover('destroy');
      return;
    }
//    var pixel = map.getEventPixel(e.originalEvent);
//    var hit = map.hasFeatureAtPixel(pixel);
//    map.getTarget().style.cursor = hit ? 'pointer' : '';
});

// create the layer with listeners to create and destroy popups
//var vector = new ol.layer.Vector("Points", {
//	eventListeners:{
//		'featureselected': function(evt){
//			var feature = evt.feature;
//			var popup = new ol.popup.FramedCloud("popup",
//				ol.LonLat.fromString(feature.geometry.toShortString()) ,
//				null,
//				"<div style='font-size:.8em'>Feature: " + feature.id + "<br>Foo: " + feature.attributes.foo+"</div>",
//				null,
//				true
//			);
//			feature.popup = popup;
//			map.addPopup(popup);
//		},
//		'featureunselected':function(evt){
//			var feature = evt.feature;
//			map.removePopup(feature.popup);
//			feature.popup.destroy();
//			feature.popup = null;
//		}
//	}
//});
