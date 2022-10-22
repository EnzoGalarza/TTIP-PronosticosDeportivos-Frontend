import React, { useEffect, useState } from "react";
import { updateTournamentsData, updateScoresInTournament } from "../api/Requests";
import Navbar from "./Navbar";
import "../styles/Tournaments.css";
import Tournament from "./Tournament";
import Table from 'react-bootstrap/Table';

const Tournaments = () => {

    const [tournamentsData, setTournamentsData] = useState({
        tournaments : []
    })

    const updateTournaments = () => {
        updateTournamentsData(localStorage.getItem("user"))
        .then((response) => {
            console.log("tournaments response: ", response)
            setTournamentsData({
                tournaments: response.data

            })
        }).catch((error) => {console.log(error)})
    };

    const updateScores = (tournamentId) => {
        updateScoresInTournament(tournamentId)
    }

    useEffect(() => {
        updateTournaments()
    },[]);

    return(
        <div>
            <header>
                <Navbar/>
            </header>
            <div className="tournaments-table-container">
                <Table className="tournaments-table" responsive="sm" striped hover bordered size="sm">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Competición</th>
                            <th>Actualizar puntos</th>
                            <th>Ver torneo</th>
                            <th>Agregar usuarios</th>
                        </tr>   
                    </thead>     
                    {tournamentsData.tournaments.map(tournament => 
                        <Tournament key={tournament.id} tournament={tournament} updateScores={updateScores}
                    />)}        
                </Table>
            </div>    
        </div>
    )
}

export default Tournaments;
