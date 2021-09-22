import React from 'react';
import Chats from '../components/chats';
import Posts from '../components/posts'

export default class Home extends React.Component{
    render(){
        return(
            <div>
                <h1> Special Space</h1>
                <Posts />
                <Chats />
            </div>
            
        )
    }

}