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
            </div>    
        </div>
    )
}

export default Notifications