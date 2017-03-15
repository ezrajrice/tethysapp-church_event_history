"use strict";
$(document).ready(function() {
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
            center: ol.proj.transform([-80.3502343, 41.829781], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6
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

    var show_feature_info = function(feature) {
        var coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);

        // Construct the innerHTML from the feature's metadata
        var feature_id = feature.a;
        var site_name = feature.get('site');
        var description = feature.get('info');
        var link = '<a href="' + feature.get('link') + '">Learn more</a>';
        var image_ref = '/static/church_event_history/images/' + feature_id + '.png';
        var popup_meta = site_name + '<br>' + link;
        var feature_meta = '<b>' + site_name + '</b><br><img src="' + image_ref + '"><br>' + description + '<br>' + link;



        info_content.html(feature_meta);
        popup_content.html(popup_meta);
        popup_content.addClass('show');
    };

    // display popup on click
    map.on('click', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
                return feature;
            });

        if (feature) {
            show_feature_info(feature);
            $('#select_event').val(feature.a);
        } else {
            info_content.html('');
            popup_content.removeClass('show');
            $('#select_event').val('none');
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

    $(document).on('change', '#select_event', function(e) {
        var feature_id = this.options[e.target.selectedIndex].value;
        if (feature_id != 'none') {
            var point_layer = map.getLayers().a[3];
            var point_features = point_layer.I.source.j;
            var feature = point_features[feature_id];
            map.setView(new ol.View({
                center: ol.proj.fromLonLat(ol.proj.toLonLat(feature.getGeometry().getCoordinates())),
                zoom: 16
            }));
            show_feature_info(feature);
        } else {
            info_content.html('');
            popup_content.removeClass('show');
            map.setView(new ol.View({
                center: ol.proj.transform([-80.3502343, 41.829781], 'EPSG:4326', 'EPSG:3857'),
                zoom: 6
            }));
        }
    });
});