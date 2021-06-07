import React, {useRef, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const chat_id = process.env.REACT_APP_CHAT_ID

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
       
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg'})
    }

    // const Capitalize = (string) => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }
    
    useEffect(() => {
    if(!user){
        history.push('/')
        return;
    }

    axios.get('https://api.chatengine.io/users/me', {
        
        headers:{
            "project-id": process.env.REACT_APP_CHAT_ID,
            "user-name": user.email,
            "user-secret": user.uid,
        }
        }).then(() => { 
            setLoading(false);
            

        }).catch(() => {
            let formData = new FormData();
            
            formData.append('email', user.email);
            formData.append('username', user.email);
            formData.append('secret', user.uid);
            let data = {"username": user.email, 
                        "secret":user.uid}

            getFile(user.photoURL).then((avatar) =>{
                formData.append('avatar', avatar, avatar.name);

                axios.post('https://api.chatengine.io/users', data,
                    { headers: 
                        {'private-key': process.env.REACT_APP_CHAT_KEY}}
                    ).then(() => 
                        setLoading(false)
                    ).catch((error) => console.log(error))
                })
            })
    }, [user, history]);

    // if(!user || loading) return 'Loading ...';
    if(user === null) history.push("/");
    console.log("user")
    console.log(user);
    console.log("loading")
    console.log(loading)

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Chat
                </div>
                <div className="logout-tab" onClick={handleLogout}>
                    Logout
                </div>
            </div>
            <ChatEngine height="calc(100vh - 66px)" 
                        projectID={chat_id}
                        userName={user == null ? "" : user.email}
                        userSecret={user == null ? "" : user.uid}>

            </ChatEngine> 
        </div>
    );
}

export default Chats;