import React, { useEffect, useState } from "react";
import { getTournamentScores } from "../api/Requests"
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import "../styles/UserTournament.css"

const UserTournament = () => {

    const { tournamentId } = useParams();

    const [userScoresData, setUserScoresData] = useState({
        userScores: []
    })

    const updateUsersScores = () => {
        getTournamentScores(tournamentId)
        .then((response) => {
            setUserScoresData({
                userScores: response.data
            })
            console.log(response.data)
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
            <div>
                {userScoresData.userScores.map(userScore =>{
                    return(
                        <div className="userScore">
                            <img src={userScore.user.profileImage} className="userScoreProfilePicture" alt={userScore.user.name} />
                            <div className="userName">
                                {userScore.user.name}
                            </div>
                            <div className="score">
                                {userScore.score}
                            </div>
                        </div>
                    )})}
            </div>
        </>
    )
}

export default UserTournament;