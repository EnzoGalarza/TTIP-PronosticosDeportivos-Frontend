import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import React, { useState, useEffect } from "react";
import { getUsers, sendInvitation} from "../api/Requests"
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "../styles/Tournaments.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Tournament({tournament, updateScores}){


    const [usersModalState, setUsersModalState] = useState(false)

    const [usersData, setUsersData] = useState([])

    const [emailData, setEmailData] = useState('')

    const [usersInvitationData, setUsersInvitationData] = useState([])

    const [error, setError] = useState("")

    const [invitationConfirm, setInvitationConfirm] = useState("")

    const navigate = useNavigate(); 

    const seeTournament = () => {
        navigate(`/userTournament/${tournament.id}`)
    }

    const hide = () => {
        $('#alertReg').hide()
        $('#alertConfirm').hide()
    }

    const showUsers = () => {
        setTimeout(hide)
        setUsersModalState(!usersModalState)
    }

    const removeUser = (userEmail) =>{
        setUsersInvitationData((current) => current.filter((user) => user !== userEmail))
    }

    const updateUsers = () => {
        getUsers(localStorage.getItem("user"))
            .then((response) =>{
                setUsersData(response.data)
            })
    }

    const handleEmailInputChange = (event) => {
        setEmailData(event.target.value)
    }

    const addUser = (email) => {
        const userToInvite = usersData.find((user => {
            return user === email
        }))

        const userInvited = usersInvitationData.find((user => {
            return user === email
        }))

        if(userInvited){
            showError(`El usuario ${email} ya está en la lista`)
        } else{
            if(userToInvite){
                setUsersInvitationData(current => [...current, userToInvite])
            } else {
                showError(`El usuario ${email} no existe`)
            }
        }

        setEmailData('')
    }

    const showConfirmation = (message) => {
        setInvitationConfirm(message)
        $('#alertConfirm').fadeTo(2000, 500).slideUp(500, () => {
            $('#alertConfirm').slideUp(500)
        })
    }

    const showError = (message) => {
        setError(message)
        $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
            $('#alertReg').slideUp(500)
        })
    }

    const inviteUsers = () => {
        sendInvitation(tournament.id,usersInvitationData)
            .then((response) => {
                if(usersInvitationData.length > 0){
                    showConfirmation("Usuarios invitados al torneo")
                    setUsersInvitationData([])
                }
                else{
                    showError("No se agregó ningún usuario")
                }
                
            })
            .catch((error) => {
                showError(error.response.data)
            })
    }

    useEffect(() => {
        $('#alertReg').hide()
        $('#alertConfirm').hide()
        updateUsers()
    },[]);

    return(
        <>
            <tbody>
                <tr>    
                    <td>{tournament.name}</td>
                    <td>{tournament.competition}</td>
                    <td><button onClick={() =>updateScores(tournament.id)}>Actualizar</button></td>
                    <td><button onClick={() => seeTournament()}>Ver</button></td>
                    <td><button onClick={() => showUsers()}>Agregar usuarios</button></td>
                </tr>    
            </tbody>

            <Modal id="UsersModal" data-refresh = "false" isOpen={usersModalState} toggle={() => showUsers([])}>
                <ModalHeader className="modal-header">
                        <span>
                            Invitar usuarios
                        </span>
                        <span>
                            <button id="CloseUsersButton" type="button" className="btn btn-danger close" aria-hidden="true" onClick={() => showUsers([])}>X</button>
                        </span>
                </ModalHeader>
                <ModalBody className="modal-body">
                    <div className="user-container">
                        <input
                            type="text" 
                            placeholder="Email usuario" 
                            id="emailInput"
                            className="emailInput" 
                            onChange={handleEmailInputChange} 
                            value={emailData}
                            name="email"
                        >
                        </input>
                        <button className="btn btn-success invite" onClick={() => addUser(emailData)}>Agregar</button>
                    </div>
                    {usersInvitationData.map(userEmail => 
                    <div className="remove-user">
                        <div className="user-email">{userEmail}</div>
                        <button className='btn btn-danger' onClick={() => removeUser(userEmail)}><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>)}
                </ModalBody>
                <ModalFooter className="modal-footer">
                    <div>    
                        <button className="btn btn-primary" onClick={() => inviteUsers()}> Enviar invitación </button>
                    </div>    
                    <div id= "alertReg" className="alert alert-danger invite-error" role="alert">
                        {error}
                    </div>
                    <div id="alertConfirm" className="alert alert-success invite-error" role="alert">
                        {invitationConfirm}
                    </div>
                </ModalFooter>
            </Modal>
        </>    
    )
}

export default Tournament;