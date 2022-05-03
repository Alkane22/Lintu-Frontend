import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, Button, Row, Col, Form, Figure, Container } from 'react-bootstrap'

import { hideHavaintoModal } from '../reducers/havaintoModalReducer'

import { updateNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

import GoogleMap from '../components/GoogleMap'

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

    const [longitude, setLongitude] = useState(29.763048327113808)
    const [latitude, setLatitude] = useState(62.62641918532752)

    const handleMapClick = () => {
        //console.log(mapRef.current.getMyState()) //Map locations
        //mapZoom = mapRef.current.getMyState().map.getZoom()
        setLatitude(mapRef.current.getMyState().lat)
        setLongitude(mapRef.current.getMyState().lng)
        //console.log(mapRef.current.getMyState().map)
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
                            <Container>
                                <GoogleMap
                                    ref={mapRef}
                                    onClick={() => handleMapClick()}
                                    mapCenter={{ lat: latitude, lng: longitude }}
                                    mapZoom={10}
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