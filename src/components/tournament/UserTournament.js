import React, { useEffect, useState } from "react";
import { getTournamentScores, updateScoresInTournament } from "../../api/Requests"
import { useParams } from 'react-router-dom';
import Navbar from "../Navbar";
import "../../styles/UserTournament.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import PositionsTable from "./PositionsTable";
import TournamentWinners from "./TournamentWinners";

const UserTournament = () => {

    const { tournamentId } = useParams();

    const [tournamentResultsData, setTournamentResultsData] = useState({
        tournamentResults: {
            users: [],
            finished: "",
        }
    })

    const updateUsersScores = () => {
        getTournamentScores(tournamentId)
        .then((response) => {
            setTournamentResultsData({
                tournamentResults: response.data
            })
        }).catch((error) => {console.log(error.response.data)})
    }

    const updateScores = () => {
        updateScoresInTournament(tournamentId)
        window.location.reload(false)
    }

    useEffect(() => {
        updateUsersScores()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <>
            <header>
                <Navbar/>
            </header>
            <div className="users-container">
                {tournamentResultsData.tournamentResults.finished ? 
                <TournamentWinners userScores={tournamentResultsData.tournamentResults.users} 
                                   tournamentName={localStorage.getItem("tournamentName")}/> 
                 :
                 <>
                    <button className="btn btn-primary refresh" onClick={() => updateScores()}><FontAwesomeIcon icon={faArrowsRotate} /> Actualizar resultados</button>
                    <PositionsTable userScores={tournamentResultsData.tournamentResults.users}
                                    tournamentName={localStorage.getItem("tournamentName")}/>
                 </>}
            </div>
        </>
    )
}

export default UserTournament;