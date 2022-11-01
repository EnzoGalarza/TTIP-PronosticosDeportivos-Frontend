import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import React, { useState, useEffect } from "react";
import { getUsers, sendInvitation} from "../api/Requests"
import { useNavigate } from "react-router-dom";
import $ from "jquery";

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

    const showUsers = () => {
        $('#alertReg').hide()
        setUsersModalState(!usersModalState)
        console.log('USUARIOS A MOSTRAR: ', usersData)
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
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
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
                <ModalHeader>
                        Users
                        <span>
                            <button id="CloseUsersButton" type="button" className="close" aria-hidden="true" onClick={() => showUsers([])}>x</button>
                        </span>
                </ModalHeader>
                <ModalBody>
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
                    <button onClick={() => addUser(emailData)}>Agregar usuario a invitar</button>

                    {usersInvitationData.map(userEmail => 
                    <div>
                        {userEmail}
                        <button onClick={() => removeUser(userEmail)}>Eliminar</button>
                    </div>)}
                    <button onClick={() => inviteUsers()}> Invitar usuarios </button>
                    <div id= "alertReg" className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </ModalBody>
            </Modal>
        </>    
    )
}

export default Tournament;