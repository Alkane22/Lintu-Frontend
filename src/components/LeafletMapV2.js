import React, { useImperativeHandle } from 'react'
import Leaf from 'leaflet'
import { Marker, Popup, TileLayer, MapContainer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const LeafletMapV2 = React.forwardRef((props, ref) => {
    let myState = {
        latlng: {lat: null, lng: null},
        map: null,
        mapZoom: props.mapZoom
    }
    const position = [props.mapCenter.lat , props.mapCenter.lng]

    let containerStyle = props.size

    let myIcon = Leaf.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
        shadowUrl: markerShadow,
        shadowSize: [41, 41],
        shadowAnchor: [14, 41]
    })

    useImperativeHandle(ref, () => ({ getMyState: () => { return myState } }), [myState])

    function MapEvents() {
        const map = useMapEvents({
            click(e) {
                myState.latlng = e.latlng
                //console.log(myState.latlng);
            },
        })

        //console.log(map) 
    }


    return (
        <MapContainer
            center={position}
            zoom={props.mapZoom}
            scrollWheelZoom={true}
            style={containerStyle}
        >

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position} icon={myIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

            <MapEvents/>
        </MapContainer>
    )
})

export default React.memo(LeafletMapV2)