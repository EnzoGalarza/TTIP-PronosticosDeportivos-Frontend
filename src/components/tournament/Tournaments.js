import React, { useEffect, useState } from "react";
import { updateTournamentsData } from "../../api/Requests";
import Navbar from "../Navbar";
import '../../styles/Tournaments.css'
import Tournament from "./Tournament";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import $ from "jquery";

const Tournaments = () => {

    const [error, setError] = useState("")

    const [tournamentsData, setTournamentsData] = useState({
        tournaments : []
    })

    const showError = (message) => {
        setError(message)
        $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
            $('#alertReg').slideUp(500)
        })
    }

    const catchError = (error) => {
        if(error.response.data){
            showError(error.response.data)
        } else {
            showError("Falló la conexión con el servidor")
        }
    }

    const updateTournaments = () => {
        updateTournamentsData(localStorage.getItem("userId"))
        .then((response) => {
            setTournamentsData({
                tournaments: response.data
            })
        }).catch((error) => {catchError(error)})
    };

    useEffect(() => {
        $('#alertReg').hide()
        updateTournaments()
    },[]);

    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <div className="tournaments-table-container">
                {tournamentsData.tournaments.length > 0 ? 
                    <MDBTable align='middle'>
                        <MDBTableHead>
                            <tr className='tableHead'>
                                <td align ='middle'>Nombre</td>
                                <td align ='middle'>Competición</td>
                                <td align ='middle'>Puntuación</td>
                                <td align ='middle'>Agregar usuarios</td>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {tournamentsData.tournaments.map(tournament => 
                                <Tournament key={tournament.id} tournament={tournament}/>
                            )}  
                        </MDBTableBody>
                    </MDBTable>
                    :
                    <div className="tournaments-nodata"> 
                        No estás participando de ningún torneo
                    </div> 
                }
                
            </div>
            <div id= "alertReg" className="alert alert-danger tournaments-error" role="alert">
                {error}
            </div>
        </div>
        
    )
}

export default Tournaments;
