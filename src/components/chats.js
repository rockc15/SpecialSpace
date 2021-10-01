import React, { useState } from 'react';
import config from '../firebase-config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from "firebase/firestore"

export default class Chats extends React.Component {
    constructor(props) {
        super(props);
        this.app = initializeApp(config)
        this.db = getFirestore();
        this.state = {
            formValue: '',
        };

        this.writePost = this.writePost.bind(this)
    }


    writePost = async (event) => {
        try {
            event.preventDefault();
            if (this.state.formValue != "") {
                const docRef = await addDoc(collection(this.db, "posts"), {
                    text: this.state.formValue,
                });
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    render() {
        return (
            <form onSubmit={this.writePost}>
                <input onChange={(e) => this.state.formValue = e.target.value} placeholder="say something nice" />
                <button type="submit" >POST</button>
            </form>
        )
    }

}