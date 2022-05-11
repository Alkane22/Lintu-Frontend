import React, { useState, useMemo, useCallback } from 'react'
import Leaf from 'leaflet'
import { Marker, Popup, TileLayer, MapContainer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const GetLocation = ({ map }) => {
    //const [position, setPosition] = useState(() => map.getCenter())
    //console.log(position)
    const onClick = useCallback(() => {
        map.locate().on('locationfound', (e) => {
            map.flyTo(e.latlng, map.getZoom())
        })
    }, [map])

    return (
        <>
            <button onClick={onClick}>locate</button>
        </>
    )
}

const GetMouseLocation = () => {

    const mapEvents = useMapEvents({
        click(e) {
            console.log(e.latlng)
            console.log('asd')
        },
    })

    /*
    map.on('click', (e) => {
        console.log(e);
    })
*/

}

function LeafletMap() {
    const [map, setMap] = useState(null)

    const position = [51.505, -0.09]

    let myIcon = Leaf.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
        shadowUrl: markerShadow,
        shadowSize: [41, 41],
        shadowAnchor: [14, 41]
    })

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '300px', width: '300px' }}
                ref={setMap}
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

                <GetMouseLocation/>

            </MapContainer>
        ),
        []
    )

    return (
        <div>
            {map ? <GetLocation map={map} /> : null}
            {displayMap}
        </div>
    )
}

export default LeafletMap