import React, { useImperativeHandle, useMemo } from 'react'

import { GoogleMap, useLoadScript, Marker, MarkerF, InfoWindow } from '@react-google-maps/api'

const GoogleComponent2 = React.forwardRef((props, ref) => {
    let myState = {
        lat: null,
        lng: null,
        map: null,
        mapZoom: props.mapZoom
    }

    let containerStyle = { width: '400px', height: '300px' }

    if(props.size){
        containerStyle = { width: props.size.width, height: props.size.height }
    }


    useImperativeHandle(ref, () => ({ getMyState: () => { return myState } }), [myState])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyADlGcIvLSjMpzy8KBvJqOyEZFrCX5OdVI'
    })

    const handleClick = (event) => {
        //console.log(event)
        myState.lat = event.latLng.lat()
        myState.lng = event.latLng.lng()
        //console.log(`lat: ${lat}, lng: ${lng}`);
        /*
        let location = {
            lat,
            lng
        }*/
        //setState(location) // results in rerending of the map.
        //myState = location
    }

    //console.log('rendering GoogleMap.Map()') //check rerenders.

    if (!isLoaded) return <div>Loading...</div>
    return <Map />

    function Map() {
        const center = props.mapCenter
        //console.log(center);

        return (
            <GoogleMap
                onLoad={(map) => {myState.map = map}}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={(e) => { handleClick(e); props.onClick() }}
            >
                <MarkerF position={center}/>
                {/**

                <InfoWindow
                    position={{ lat: -3.7045699798311773, lng: -38.47285967650946 }}
                >
                    <div>
                        <h1>InfoWindow</h1>
                    </div>
                </InfoWindow>
                 */}
            </GoogleMap>
        )
    }
})


export default React.memo(GoogleComponent2)
//apikey
//AIzaSyADlGcIvLSjMpzy8KBvJqOyEZFrCX5OdVI
