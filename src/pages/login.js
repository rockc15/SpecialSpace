import React from 'react';
import '../css/login.css'
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import config from '../firebase-config';



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.app = initializeApp(config)
        this.auth = getAuth();
        this.state = {
            email: '',
            password: '',
        };

        this.signIn = this.signIn.bind(this)
    }


    signIn = async (event) => {
        try {
            event.preventDefault();
            signInWithEmailAndPassword(this.auth, this.state.email, this.state.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    window.location = '/home';
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });

            return false
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    render() {
        return (
            <div id="page">
                <Container className="container-fluid h-100">
                    <Row className="row justify-content-center align-content-center h-100">
                        <Col className="col-5">
                            <h1 className="display-1">Special Space</h1>
                            <div className="card light">
                                <div className="card-body ">
                                    <Form onSubmit={this.signIn}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => this.state.email = e.target.value} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" onChange={(e) => this.state.password = e.target.value} />
                                        </Form.Group>
                                        <input type='submit' id='submit-btn' class='btn btn-dark w-50 mt-2' value='Login' />
                                    </Form>
                                    <a class="btn btn-outline-primary w-50 m-2" href="/createNewAccount" id="create-new-account">Create New Account</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}