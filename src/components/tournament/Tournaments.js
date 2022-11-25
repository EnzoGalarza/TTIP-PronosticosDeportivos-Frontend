import React, { useEffect, useState } from "react";
import { updateTournamentsData } from "../../api/Requests";
import Navbar from "../Navbar";
import '../../styles/Tournaments.css'
import Tournament from "./Tournament";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const Tournaments = () => {

    const [tournamentsData, setTournamentsData] = useState({
        tournaments : []
    })

    const updateTournaments = () => {
        updateTournamentsData(localStorage.getItem("userId"))
        .then((response) => {
            setTournamentsData({
                tournaments: response.data
            })
        }).catch((error) => {console.log(error)})
    };

    

    useEffect(() => {
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
        </div>
    )
}

export default Tournaments;
