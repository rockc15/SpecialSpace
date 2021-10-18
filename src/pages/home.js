import React from 'react';
import Chats from '../components/chats';
import Posts from '../components/posts'
import User from '../components/user';
import '../css/home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default class Home extends React.Component {
    render() {
        return (
            <div id="page">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#Home">Special Space</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#Home">Home</Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Container className="container-fluid h-100">
                    <Row className="justify-content-md-center" style={{ padding: '2%' }}>
                        <Col>
                            <User></User>
                        </Col>
                    </Row>

                </Container>
            </div>

        )
    }

}