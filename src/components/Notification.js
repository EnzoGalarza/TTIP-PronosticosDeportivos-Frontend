function Notification({tournamentId, id, message, acceptable, acceptInvitation}){
    
    return(
        <tbody>
            <tr>    
                <td>{message}</td>
                <td>{acceptable ? <button className="btn btn-success" onClick={() => acceptInvitation(tournamentId, localStorage.getItem("user"), id)}>Aceptar invitación</button> : <></>}</td>
                <td><button className="btn btn-danger">Rechazar invitación</button></td>
            </tr>    
        </tbody>
    )

}

export default Notification;