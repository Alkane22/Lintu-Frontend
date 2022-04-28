import React, { useState, useEffect } from 'react'
import { Card, Button, ListGroup, Container, Row, Col, Figure, Carousel } from 'react-bootstrap'
import havaintos from '../services/havaintoService'
import kanakuva from '../imgs/Corvus_cornix_Oulu_1.JPG'
import kuva from '../imgs/istockphoto-1.jpg'

const Havainnot = () => {
    const [dataFromServer, setDataFromServer] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await havaintos.getHavainnot()
            setDataFromServer(response)
        }
        fetchData()
    }, [])

    const Havainto = ({ location, date, user, info, observations }) => {
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
            >
                <Card.Header>
                    <h5>{location}</h5>
                </Card.Header>
                <Card.Img variant="top" src={kuva} />
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
        <Container>
            <Row >
                {dataFromServer.map((havainto, index) => {
                    console.log(havainto);
                    let date = new Date(Number(havainto.date))
                    return (
                        <Col key={index}>
                            <Havainto
                                location={`${havainto.county} (${havainto.location.Latitude}, ${havainto.location.Longitude})`}
                                date={date.toDateString()}
                                user={havainto.user.username}
                                info={havainto.info}
                                observations={havainto.observations}
                            />
                        </Col>
                    )

                })}
            </Row>
        </Container>
    )
}

export default Havainnot