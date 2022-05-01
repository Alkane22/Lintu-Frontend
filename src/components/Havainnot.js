import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Card, Button, ListGroup, Container, Row, Col, Figure, Carousel } from 'react-bootstrap'
import havaintos from '../services/havaintoService'
import kanakuva from '../imgs/Corvus_cornix_Oulu_1.JPG'
import kuva from '../imgs/istockphoto-1.jpg'

import GoogleMap from './GoogleMap'

const Havainnot = () => {
    const [dataFromServer, setDataFromServer] = useState([])
    const mapRef = useRef()

    useEffect(() => {
        async function fetchData() {
            const response = await havaintos.getHavainnot()
            setDataFromServer(response)
        }
        fetchData()
    }, [])

    const delHav = async id => {
        try {
            await havaintos.deleteHavainto(id)
            const response = await havaintos.getHavainnot()
            setDataFromServer(response)
        } catch (e) {
            console.log(e.response.data)
        }

    }

    const Havainto = ({ county, coords, date, user, info, observations, id }) => {
        /* colors
        [
            'Primary',
            'Secondary',
            'Success',
            'Danger',
            'Warning',
            'Info',
            'Light',
            'Dark',
        ]
        */

        /* old for safe keeping.
         return (
            <Card
                border='dark'
                bg='light'
                text='dark'
                id={'HavaintoKortti'}
            >
                <Card.Header>
                    <h5>{location}</h5>
                    </Card.Header>
                    <Card.Img variant="top" src={kuva} />
                    <Card.Body>
                        <Card.Title>{user}</Card.Title>
                        <Card.Subtitle>{info}</Card.Subtitle>
                        <Card.Text>Havainnot:</Card.Text>
                        <ListGroup variant="flush">
                            {observations.map((obs, i) => {
                                //console.log(obs);
                                return (
                                    <ListGroup.Item key={i}>{obs.bird} {obs.amount}</ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer>{date}</Card.Footer>
                </Card>
            )
        */

        return (
            <Card
                border='dark'
                bg='light'
                text='dark'
                id={'HavaintoKortti'}
                className="justify-content-md-center"
            >
                <Card.Header>
                    <Row>
                        <Col xs={9}>
                            <h5>{county}</h5>

                        </Col>
                        <Col xs={3}>
                            <Button
                                variant='danger'
                                onClick={() => delHav(id)}
                            >X
                            </Button>
                        </Col>
                    </Row>
                </Card.Header>

                {/*<Card.Img variant="top" src={kuva} />*/}

                <Card.Body>
                    <GoogleMap
                        ref={mapRef}
                        size={{ width: '100%', height: '200px' }}
                        mapCenter={coords}
                    />
                </Card.Body>

                <Card.Body>
                    <Card.Title>{user}</Card.Title>
                    <Card.Subtitle>{info}</Card.Subtitle>

                    <Carousel id={'HavaintoKaruselli'}>
                        {observations.map((obs, i) => {
                            //console.log(obs);
                            return (
                                <Carousel.Item key={i} id={'HavaintoKaruselliItem'}>
                                    <img
                                        src={obs.bird.image}
                                        className="d-block w-100"
                                        alt={`slide(${i})`}
                                    />
                                    <Carousel.Caption>
                                        <h3>{obs.bird.name}</h3>
                                        <h4>{obs.amount} kpl</h4>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>

                </Card.Body>
                <Card.Footer>{date}</Card.Footer>
            </Card>
        )

    }

    return (
        <Container >
            <Row className="justify-content-xl-start">
                {dataFromServer.map((havainto, index) => {
                    console.log(havainto);
                    let date = new Date(Number(havainto.date))
                    return (
                        <Col md={4} key={index} id='Havainnot'>
                            <Havainto
                                county={`${havainto.county}`} // (${havainto.location.Latitude}, ${havainto.location.Longitude})
                                coords={{ lat: Number(havainto.location.Latitude), lng: Number(havainto.location.Longitude) }}
                                date={date.toDateString()}
                                user={havainto.user.username}
                                info={havainto.info}
                                observations={havainto.observations}
                                id={havainto.id}
                            />
                        </Col>
                    )

                })}
            </Row>
        </Container>
    )
}

export default Havainnot