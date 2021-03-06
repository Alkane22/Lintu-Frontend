import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Row, Col, Container } from 'react-bootstrap'

import { hideHavaintoModal } from '../reducers/havaintoModalReducer'

import { updateNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

import GoogleMap from '../components/GoogleMap'
import LeafletMapV2 from '../components/LeafletMapV2'

import HavaintoForm from './components/HavaintoForm'

function CreateHavaintoModal() {
    const havaintoModal = useSelector(state => state.havaintoModal)
    const mapRef = useRef()
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(hideHavaintoModal())
    }

    const notify = message => {
        dispatch(updateNotification(message))
        console.log(message)
    }

    const [longitude, setLongitude] = useState(29.76208090782166)
    const [latitude, setLatitude] = useState(62.60066914543552)

    const handleMapClick = () => {
        let myLat = mapRef.current.getMyState().latlng.lat
        let myLng = mapRef.current.getMyState().latlng.lng

        if (typeof myLat !== 'undefined' && typeof myLng !== 'undefined') {
            if (myLat && myLng) {
                setLatitude(myLat)
                setLongitude(myLng)
            }
        }
        //console.log(mapRef.current.getMyState().latlng)
    }

    return (
        <>
            <Modal
                show={havaintoModal.type}
                onHide={handleClose}
                size='lg'
                centered
                id='havaintoModal'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Havainto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col>
                            <Container onClick={() => handleMapClick()}>
                                <LeafletMapV2
                                    ref={mapRef}
                                    mapCenter={{ lat: latitude, lng: longitude }}
                                    mapZoom={11}
                                    size={{ width: '100%', height: '400px' }}
                                />
                            </Container>
                        </Col>
                    </Row>

                    <HavaintoForm
                        notify={() => notify()}
                        handleClose={() => handleClose()}
                        mapRef={mapRef}
                    />

                </Modal.Body>

                <Modal.Footer>
                    <Notification />
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default CreateHavaintoModal