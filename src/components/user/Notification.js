import "../../styles/Notifications.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

function Notification({tournamentId, id, message, acceptable, acceptInvitation, declineInvitation}){
    
    return(

        <div className="notifications">
            <div data-testid="notification-message" className="notificationMessage">
                {message}
            </div>
            <div className="accept">
                {acceptable ? <button className="btn btn-success accept" onClick={() => acceptInvitation(tournamentId, localStorage.getItem("user"), id)}><FontAwesomeIcon icon={faCheck} /> Aceptar</button> : <></>}
            </div>
            <div className="reject">
                <button className="btn btn-danger reject" onClick={() => declineInvitation(localStorage.getItem("userId"), id)}><FontAwesomeIcon icon={faXmark} /> Rechazar</button>
            </div>
        </div>

    )

}

export default Notification;