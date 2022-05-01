import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Row, Col, Form, Figure, Container } from "react-bootstrap";

import { hideHavaintoModal } from '../reducers/havaintoModalReducer'

import { updateNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'

import havaintoService from '../services/havaintoService';
import GoogleMap from '../components/GoogleMap';

function CreateHavaintoModal() {
    const havaintoModal = useSelector(state => state.havaintoModal)
    const mapRef = useRef()
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(hideHavaintoModal())
    }

    const notify = message => {
        dispatch(updateNotification(message))
    }

    const [linnut, setLinnut] = useState([])
    const [lintuHaku, setHaku] = useState('')
    const [amount, setAmount] = useState(0)
    const [alue, setAlue] = useState('')
    const [longitude, setLongitude] = useState(29.763048327113808)
    const [latitude, setLatitude] = useState(62.62641918532752)
    const [info, setInfo] = useState('')

    const handleMapClick = () => {
        //console.log(mapRef.current.getMyState()) //Map locations
        //mapZoom = mapRef.current.getMyState().map.getZoom()
        setLatitude(mapRef.current.getMyState().lat)
        setLongitude(mapRef.current.getMyState().lng)
        //console.log(mapRef.current.getMyState().map)
    }

    const addLintu = async (lintu, maara) => {

        if (linnut.length >= 5) {
            notify('5 linnun maksimi')
            return
        }

        try {
            const res = await havaintoService.searchBird(lintu)
            //console.log(res.status)
            if (res.status === 200) {
                notify(lintu + ' lisätty')
                const bird = {
                    name: res.data[0].name,
                    image: res.data[0].image,
                    id: res.data[0].id,
                    amount: maara
                }
                setLinnut(oldArray => [...oldArray, bird])
            }
            if (res.status === 201) {
                notify(lintu + ' lisätty')
                const bird = {
                    name: res.data.name,
                    image: res.data.image,
                    id: res.data.id,
                    amount: maara
                }
                setLinnut(oldArray => [...oldArray, bird])
            }
        } catch (error) {
            console.log(error)
            notify('jotain meni vikaan')
            /*
            if(error.response.data.error === 'name not found'){
                notify(lintu + ' ei löytynyt')
            }
            */
        }
    }

    const saveHavainto = async (observations, county, long, lat, info) => {

        /*
        const modifiedObservations = observations.map(obs =>  (
            {bird: obs.id, amount: obs.amount}
        ))
        */
        let modifiedObservations = {}
        observations.map(obs => (
            modifiedObservations[obs.name] = obs.amount
            //{[obs.name]: obs.amount}
        ))

        const havObj = {
            observations: modifiedObservations,
            county,
            location: { Latitude: lat, Longitude: long },
            info
        }

        const res = await havaintoService.createHavainto(havObj)


        emptyInputs()
        handleClose()


        //console.log(res)
    }

    const emptyInputs = () => {
        //const [linnut, setLinnut] = useState([])
        setLinnut([])
        //const [lintuHaku, setHaku] = useState('')
        setHaku('')
        //const [amount, setAmount] = useState(0)
        setAmount(0)
        //const [alue, setAlue] = useState('')
        setAlue('')
        //const [longitude, setLongitude] = useState('')
        setLongitude('')
        //const [latitude, setLatitude] = useState('')
        setLatitude('')
        //const [info, setInfo] = useState('')
        setInfo('')
    }

    const FormComponent = () => {
        return (
            <Container>
                <Row>
                        <Col >
                            <Form.Label>Alue</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                value={alue}
                                onChange={({ target }) => setAlue(target.value)}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Pituusaste</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                value={longitude}
                                onChange={({ target }) => setLongitude(Number(target.value))}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Leveysaste</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                value={latitude}
                                onChange={({ target }) => setLatitude(Number(target.value))}
                            />
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={1}>
                            <Form.Label
                                htmlFor='inputLintu1'
                            >Lintu
                            </Form.Label>
                        </Col>
                        <Col xs={4}>
                            <Form.Control
                                id="inputLintu1"
                                value={lintuHaku}
                                onChange={({ target }) => setHaku(target.value)}
                            />
                        </Col>
                        <Col xs={2}>
                            <Form.Label
                                htmlFor='inputLintu2'
                            >Määrä
                            </Form.Label>
                        </Col>
                        <Col xs={2}>
                            <Form.Control
                                id="inputLintu2"
                                value={amount}
                                onChange={({ target }) => setAmount(Number(target.value))}
                            />
                        </Col>
                        <Col xs={2}>
                            <Button
                                onClick={() => addLintu(lintuHaku, amount)}
                                variant='success'
                            >Lisää
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        {linnut.map((lintu, i) => {
                            //console.log(lintu)
                            return (
                                <Col xs={2} key={i}>
                                    <Figure>
                                        <Figure.Image id='lintuFigImg'
                                            alt={lintu.name}
                                            src={lintu.image}
                                        />
                                        <Figure.Caption>
                                            {lintu.name}
                                        </Figure.Caption>
                                    </Figure>
                                </Col>
                            )
                        })}
                    </Row>



                    <Row>
                        <Col>
                            <Form.Label>Info:</Form.Label>
                            <Form.Control
                                value={info}
                                onChange={({ target }) => setInfo(target.value)}
                            />
                        </Col>
                    </Row>
            </Container>
        )
    }

    return (
        <>
            <Modal
                show={havaintoModal.type}
                onHide={handleClose}
                size='md'
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
                                />
                            </Container>
                        </Col>
                    </Row>

                <FormComponent/>
                    
                    {/* 
                    <Row>
                        <Col >
                            <Form.Label>Alue</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                value={alue}
                                onChange={({ target }) => setAlue(target.value)}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Pituusaste</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                value={longitude}
                                onChange={({ target }) => setLongitude(Number(target.value))}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Label>Leveysaste</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control
                                value={latitude}
                                onChange={({ target }) => setLatitude(Number(target.value))}
                            />
                        </Col>
                    </Row>


                    <Row>
                        <Col xs={1}>
                            <Form.Label
                                htmlFor='inputLintu1'
                            >Lintu
                            </Form.Label>
                        </Col>
                        <Col xs={4}>
                            <Form.Control
                                id="inputLintu1"
                                value={lintuHaku}
                                onChange={({ target }) => setHaku(target.value)}
                            />
                        </Col>
                        <Col xs={2}>
                            <Form.Label
                                htmlFor='inputLintu2'
                            >Määrä
                            </Form.Label>
                        </Col>
                        <Col xs={2}>
                            <Form.Control
                                id="inputLintu2"
                                value={amount}
                                onChange={({ target }) => setAmount(Number(target.value))}
                            />
                        </Col>
                        <Col xs={2}>
                            <Button
                                onClick={() => addLintu(lintuHaku, amount)}
                                variant='success'
                            >Lisää
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        {linnut.map((lintu, i) => {
                            //console.log(lintu)
                            return (
                                <Col xs={2} key={i}>
                                    <Figure>
                                        <Figure.Image id='lintuFigImg'
                                            alt={lintu.name}
                                            src={lintu.image}
                                        />
                                        <Figure.Caption>
                                            {lintu.name}
                                        </Figure.Caption>
                                    </Figure>
                                </Col>
                            )
                        })}
                    </Row>



                    <Row>
                        <Col>
                            <Form.Label>Info:</Form.Label>
                            <Form.Control
                                value={info}
                                onChange={({ target }) => setInfo(target.value)}
                            />
                        </Col>
                    </Row>

                    */}
                </Modal.Body>

                <Modal.Footer>
                    <Notification />

                    <Button
                        variant='danger'
                        onClick={() => emptyInputs()}
                    >Tyhjennä
                    </Button>

                    <Button
                        variant="primary"
                        onClick={() => saveHavainto(linnut, alue, String(longitude), String(latitude), info)}
                    >Tallenna
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default CreateHavaintoModal