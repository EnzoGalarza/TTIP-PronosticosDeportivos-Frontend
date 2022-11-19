import React, { useEffect, useState } from 'react';
import "../../styles/Notifications.css"
import { getNotifications, confirmInvitation, deleteNotification } from "../../api/Requests"
import Navbar from '../Navbar';
import { Table } from 'react-bootstrap';
import Notification from './Notification';
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const Notifications = () => {

    const navigate = useNavigate(); 

    const [userNotificationsData, setUserNotificationsData] = useState({
        notifications: []
    })

    const [confirmation, setConfirmation] = useState("")

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

    const hide = () => {
        $('#alertReg').hide()
        $('#alertConfirm').hide()
    }

    const acceptInvitation = (tournamentId, userEmail, notificationId) => {
        confirmInvitation(tournamentId,userEmail,notificationId)
            .then((response) => {
                navigate("/tournaments")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const showConfirmation = (message) => {
        setConfirmation(message)
        $('#alertConfirm').fadeTo(2000, 500).slideUp(500, () => {
            $('#alertConfirm').slideUp(500)
        })
    }

    const declineInvitation = (userId, notificationId) => {
        deleteNotification(userId,notificationId)
            .then(() => {
                showConfirmation("Invitación eliminada correctamente")
                updateNotifications()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        setTimeout(hide)
        updateNotifications()
    },[]);

    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <div className="tournaments-table-container">
                {userNotificationsData.notifications.length > 0 ?
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
                                            acceptable={notification.acceptable} acceptInvitation={acceptInvitation} declineInvitation={declineInvitation}/>)                                        
                        }        
                    </Table> :
                    <div className="notifications-nodata">
                        No se encuentra ninguna notificación
                    </div>
                }
                <div id="alertConfirm" className="alert alert-success confirm-delete">
                    {confirmation}
                </div>
            </div>    
        </div>
    )
}

export default Notifications