import React, { useEffect, useState } from "react";
import { updateTournamentsData } from "../../api/Requests";
import Navbar from "../Navbar";
import '../../styles/Tournaments.css'
import Tournament from "./Tournament";
import Table from 'react-bootstrap/Table';

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
                    <Table className="tournaments-table" responsive="sm" striped hover bordered size="sm">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Competición</th>
                                <th>Ver torneo</th>
                                <th>Agregar usuarios</th>
                            </tr>   
                        </thead>     
                        {tournamentsData.tournaments.map(tournament => 
                            <Tournament key={tournament.id} tournament={tournament}/>
                        )}        
                    </Table> : 
                    <div className="tournaments-nodata"> 
                        No se encuentra ningún torneo
                    </div> 
                }
                
            </div>    
        </div>
    )
}

export default Tournaments;
