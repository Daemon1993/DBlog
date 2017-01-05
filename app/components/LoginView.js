/**
 * Created by Daemon1993 on 17/1/5.
 */

import React, {Component} from 'react';

export default class LoginView extends Component {

    login() {
        let formData = new FormData();
        formData.append('username', 'daemon');
        fetch('http://localhost:5000/login', {
            method: 'POST',
            body: formData,
            // mode: "cors",
            credentials: 'include'
        }).then(res => res.text()).then(result => {
            console.log(result)
        }).catch((error) => {
            console.log(JSON.stringify(error))
        });
    }

    render() {
        return (
            <div style={{fontSize: 30, justifyContent: 'center', flex: 1, backgroundColor: 'red', display: 'flex'}}>
                <div>
                    <p><input type="text"/>username</p>
                    <p><input type="text"/>password</p>
                    <button style={{fontSize:30}} onClick={()=>this.login()}>login</button>
                </div>
            </div>
        );
    }
}