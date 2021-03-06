import React from 'react'
import { GoogleOutlined, FacebookOutlined} from '@ant-design/icons'
import "firebase/app"
import {auth} from '../firebase'
import firebase from 'firebase/app'

export const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Bem vindo ao meu chat</h2>
                <div className="login-button google"
                 onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <GoogleOutlined/> Login com Google
                </div>
                <br/><br/>
                <div className="login-button facebook"
                 onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}>
                    <FacebookOutlined/> Login com Facebook
                </div>
            </div>
            
        </div>
    )
}

export default Login;
