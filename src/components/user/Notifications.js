import React, { useEffect, useState } from 'react';
import "../../styles/Notifications.css"
import '../../styles/index.css'
import { getNotifications, confirmInvitation, deleteNotification } from "../../api/Requests"
import Navbar from '../Navbar';
import Notification from './Notification';
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const Notifications = () => {

    const navigate = useNavigate(); 

    const [error, setError] = useState("")

    const [userNotificationsData, setUserNotificationsData] = useState({
        notifications: []
    })

    const [confirmation, setConfirmation] = useState("")

    const catchError = (error) => {
        if(error.response.data){
            showError(error.response.data)
        } else {
            showError("Falló la conexión con el servidor")
        }
    }

    const showError = (message) => {
        setError(message)
        $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
            $('#alertReg').slideUp(500)
        })
    }

    const updateNotifications = () => {
        getNotifications(localStorage.getItem("userId"))
        .then((response) => {
            setUserNotificationsData({
                notifications: response.data
            })    
        })
        .catch((error) => {catchError(error)})
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
                showConfirmation("Invitación rechazada correctamente")
                updateNotifications()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        setTimeout(hide)
        updateNotifications()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <div data-testid="notifications" className="tournaments-table-container">
                {userNotificationsData.notifications.length > 0 ?
                    <>
                        {userNotificationsData.notifications.map(notification =>{
                            return(
                                <Notification key={notification.id} tournamentId={notification.tournamentId} id={notification.id} message={notification.message} 
                                              acceptable={notification.acceptable} acceptInvitation={acceptInvitation} declineInvitation={declineInvitation}/>
                            )
                        })}
                    </>
                    :
                    <div data-testid="no-notifications" className="notifications-nodata">
                        No tenés notificaciones
                    </div>
                }
                <div id="alertConfirm" className="alert alert-success confirm-delete">
                    {confirmation}
                </div>
                <div id= "alertReg" className="alert alert-danger notifications-error" role="alert">
                    {error}
                </div>
            </div>
        </div>
    )
}

export default Notifications