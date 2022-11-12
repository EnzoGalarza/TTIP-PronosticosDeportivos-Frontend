import React, { useEffect, useState } from "react";
import { getTournamentScores } from "../api/Requests"
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import "../styles/UserTournament.css"
import DataTable from "react-data-table-component";

const UserTournament = () => {

    const { tournamentId } = useParams();

    const [userScoresData, setUserScoresData] = useState({
        userScores: []
    })

    const columns = [
        {
            name: 'Nombre',
            selector: 'user.name'
        },
        {
            name: 'Puntaje',
            selector: 'score'
        },
        {
            name: 'Aciertos',
            selector: 'hits'
        },
        {
            name: 'Pronósticos evaluados',
            selector: 'totalPronostics'
        },
        {
            name: 'Porcentaje de aciertos',
            selector: 'percentage'
        }
    ]

    const updateUsersScores = () => {
        getTournamentScores(tournamentId)
        .then((response) => {
            setUserScoresData({
                userScores: response.data
            })
            console.log("USERS",response)
        }).catch((error) => {console.log(error)})
    }

    useEffect(() => {
        updateUsersScores()
    },[]);

    return(
        <>
            <header>
                <Navbar/>
            </header>
            <div className="users-container">
                <DataTable
                columns={columns}
                data={userScoresData.userScores}
                title="Posiciones"
                />
            </div>
        </>
    )
}

export default UserTournament;