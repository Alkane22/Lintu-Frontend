import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Form, Figure, Container } from "react-bootstrap";
import havaintoService from '../../services/havaintoService';

import { updateNotification } from '../../reducers/notificationReducer'

export default function HavaintoForm({ handleClose, mapRef }) {
    const [linnut, setLinnut] = useState([])
    const [lintuHaku, setHaku] = useState('')
    const [amount, setAmount] = useState(0)
    const [alue, setAlue] = useState('')
    const [longitude, setLongitude] = useState(29.763048327113808)
    const [latitude, setLatitude] = useState(62.62641918532752)
    const [info, setInfo] = useState('')

    const dispatch = useDispatch()
    const notify = message => {
        dispatch(updateNotification(message))
        console.log(message);
    }

    //we get lat and long from GoogleMap refrence
    if (mapRef.current) {
        //if getMyState() doesnt exist yet calling it is bad.

        let long = mapRef.current.getMyState().lng || longitude
        //lng might be null so we need can use longitude instead

        //if they are not compared we go into infinite useState render loop.
        if (long !== longitude) {
            setLongitude(long)
        }

        let lati = mapRef.current.getMyState().lat || latitude
        if (lati !== latitude) {
            setLatitude(lati)
        }

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
            notify(error.response.data.error)
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

    return (
        <Container id='HavaintForm'>
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

            <Row>
                <Col className="d-grid gap-2">
                    <Button
                        size='lg'
                        variant='danger'
                        onClick={() => emptyInputs()}
                    >Tyhjennä
                    </Button>


                </Col>
                <Col className="d-grid gap-2">
                    <Button
                        size='lg'
                        variant="primary"
                        onClick={() => saveHavainto(linnut, alue, String(longitude), String(latitude), info)}
                    >Tallenna
                    </Button>
                </Col>
            </Row>

        </Container>
    )
}
