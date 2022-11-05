import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import React, { useState, useEffect } from "react";
import { getUsers, sendInvitation} from "../api/Requests"
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "../styles/Tournaments.css"

function Tournament({tournament, updateScores}){


    const [usersModalState, setUsersModalState] = useState(false)

    const [usersData, setUsersData] = useState([])

    const [emailData, setEmailData] = useState('')

    const [usersInvitationData, setUsersInvitationData] = useState([])

    const [error, setError] = useState("")

    const navigate = useNavigate(); 

    const seeTournament = () => {
        navigate(`/userTournament/${tournament.id}`)
    }

    const hide = () => {
        $('#alertReg').hide()
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
            setError(`Usuario ${email} ya está en la lista`)
            $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
                $('#alertReg').slideUp(500)
            })
        } else{
            if(userToInvite){
                setUsersInvitationData(current => [...current, userToInvite])
            } else {
                setError(`Usuario ${email} inexistente`)
                $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
                    $('#alertReg').slideUp(500)
                })
            }
        }

        setEmailData('')
    }

    const inviteUsers = () => {
        sendInvitation(tournament.id,usersInvitationData)
            .then((response) => {
                setTimeout(hide)
            })
            .catch((error) => {
                setError(error.response.data)
                $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
                    $('#alertReg').slideUp(500)
                })
            })
    }

    useEffect(() => {
        $('#alertReg').hide()
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
                            Usuarios
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
                        <button className="btn btn-success invite" onClick={() => addUser(emailData)}>Agregar usuario a invitar</button>
                    </div>
                    {usersInvitationData.map(userEmail => 
                    <div className="remove-user">
                        <div className="user-email">{userEmail}</div>
                        <button className='btn btn-danger' onClick={() => removeUser(userEmail)}>Eliminar</button>
                    </div>)}
                </ModalBody>
                <ModalFooter className="modal-footer">
                    <div>    
                        <button className="btn btn-primary" onClick={() => inviteUsers()}> Invitar usuarios </button>
                    </div>    
                    <div id= "alertReg" className="alert alert-danger invite-error" role="alert">
                        {error}
                    </div>
                </ModalFooter>
            </Modal>
        </>    
    )
}

export default Tournament;