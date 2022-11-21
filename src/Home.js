import React, { Component } from 'react';
import AppNav from './AppNav';

class Home extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <AppNav/>
                <h2 class="display-4"style={{display: 'flex', color: '#3d9c3a', justifyContent:'center', alignItems:'center', height: '100vh'}}>
               <img alt="people" src="/homepage.png"/>
               Welcome to PayPath!
               </h2>
            </div>
        );
    }
}
 
export default Home;