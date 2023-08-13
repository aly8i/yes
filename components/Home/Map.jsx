"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; 
import styles from "./Map.module.scss";
const Map = ()=>{
  const MAPBOX_APIKEY = `${process.env.MAP_BOX_API_KEY}`;
  mapboxgl.accessToken = MAPBOX_APIKEY;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);
  const [lng,setLng] = useState(33.8254);
  const [lat,setLat]=useState(35.5067);
  
  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
        dragRotate: false,
        touchZoomRotate: false,
      });
      
      
map.current.on('load', () => {
    map.current.loadImage(
    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
    (error, image) => {
    if (error) throw error;
    map.current.addImage('custom-marker', image);
    // Add a GeoJSON source with 2 points
    map.current.addSource('points', {
    'type': 'geojson',
    'data': {
    'type': 'FeatureCollection',
    'features': [
    {
    // feature for Mapbox DC
    'type': 'Feature',
    'geometry': {
    'type': 'Point',
    'coordinates': [
        35.5067, 33.8254 
    ]
    },
    'properties': {
        'title': 'Yes'
        }
    },
    ]
    }
    });
     
    map.current.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'points',
    'layout': {
    'icon-image': 'custom-marker',
    // get the title name from the source's "title" property
    'text-field': ['get', 'title'],
    'text-font': [
    'Open Sans Semibold',
    'Arial Unicode MS Bold'
    ],
    'text-offset': [0, 1.25],
    'text-anchor': 'top'
    }
    });
    }
    );
    });
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });

      map.current?.flyTo({center:[35.5112, 33.8241],zoom:15});
    }
    console.log(lat,lng)
  }, [lat, lng, zoom]);
    return (
        <div className={styles.mapWrapper}>
            <div ref={mapContainer} className={styles.mapContainer}>
            </div>
        </div> 
    )
}

export default Map