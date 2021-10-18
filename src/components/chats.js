import React, { useState } from 'react';
import config from '../firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, updateDoc, doc, arrayUnion, query, onSnapshot } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export default class Chats extends React.Component {
    constructor(props) {
        super(props);
        this.groupName = props.group
        this.app = initializeApp(config)
        this.db = getFirestore();
        this.auth = getAuth();
        this.userID = " "
        this.state = {
            formValue: '',
        };

        this.writePost = this.writePost.bind(this)
    }

    componentDidMount() {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                const q = query(doc(this.db, "users", user.uid));
                onSnapshot(doc(this.db, "users", user.uid), (doc) => {

                    this.userInfo = {
                        uid: user.uid,
                        first_name: doc.data().first_name,
                        last_name: doc.data().last_name,
                        groups: doc.data().groups
                    }
                    console.log(doc.data())
                });

            }
        })
    }


    writePost = async (event) => {
        try {
            event.preventDefault();
            if (this.state.formValue != "") {
                console.log(this.groupName)
                await addDoc(collection(this.db, "groups", this.groupName, "posts"), {
                    text: this.state.formValue,
                    timestamp: Date.now(),
                    user: this.userInfo.first_name + " " + this.userInfo.last_name
                })

            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    render() {
        return (
            <Form onSubmit={this.writePost}>
                <Form.Group className="mb-3" >
                    <Form.Control onChange={(e) => this.state.formValue = e.target.value} placeholder="say something nice" />
                    <Button type="submit" >POST</Button>
                </Form.Group>
            </Form>
        )
    }

}