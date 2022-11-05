import React, { useEffect, useState } from 'react';
import "../styles/Notifications.css"
import { getNotifications, confirmInvitation, deleteNotification } from "../api/Requests"
import Navbar from './Navbar';
import { Table } from 'react-bootstrap';
import Notification from './Notification';
import { useNavigate } from "react-router-dom";

const Notifications = () => {

    const navigate = useNavigate(); 

    const [userNotificationsData, setUserNotificationsData] = useState({
        notifications: []
    })

    const updateNotifications = () => {
        getNotifications(localStorage.getItem("userId"))
        .then((response) => {
            console.log("NOTIFICATIONS: ", response.data)
            setUserNotificationsData({
                notifications: response.data
            })    
        })
        .catch((error) => {console.log(error)})
    }

    const acceptInvitation = (tournamentId, userEmail, notificationId) => {
        confirmInvitation(tournamentId,userEmail)
            .then((response) => {
                deleteNotification(localStorage.getItem("userId"), notificationId)
                    .then((response) => {
                        navigate("/tournaments")
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        updateNotifications()
    },[]);

    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <div className="tournaments-table-container">
                <Table className="tournaments-table" responsive="sm" striped hover bordered size="sm">
                    <thead>
                        <tr>
                            <th>Mensaje</th>
                            <th>Aceptar</th>
                            <th>Rechazar</th>
                        </tr>   
                    </thead>     
                    {userNotificationsData.notifications.map(notification => 
                        <Notification key={notification.id} tournamentId={notification.tournamentId} id={notification.id} message={notification.message} 
                                        acceptable={notification.acceptable} acceptInvitation={acceptInvitation}/>)
                    }        
                </Table>
            </div>    
        </div>
    )
}

export default Notifications