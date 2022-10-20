import React, { useEffect, useState } from "react";
import { updateTournamentsData, updateScoresInTournament } from "../api/Requests"
import Navbar from "./Navbar";

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
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Competencia</th>
                </tr>        
                {tournamentsData.tournaments.map(tournament => 
                        <>
                            <tr>
                                <td>
                                    {tournament.name}
                                </td>
                                <td>
                                    {tournament.competition}
                                </td>
                                <td>
                                    <button onClick={() =>updateScores(tournament.id)}>Actualizar</button>
                                </td>
                            </tr>         
                        </>)}
            </table>
        </div>
    )
}

export default Tournaments;
