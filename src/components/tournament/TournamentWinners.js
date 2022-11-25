import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faRankingStar, faTrophy } from '@fortawesome/free-solid-svg-icons';
import PositionsTable from "./PositionsTable";
import "../../styles/TournamentWinners.css"

const TournamentWinners = ({userScores, tournamentName, tournamentId}) => {

    const [positionsData, setPositionsData] = useState({
        positions: false
    })

    const winners = userScores.slice(0, 3);
    var position = 0;

    const switchPositions = () => {
        setPositionsData({
            positions: !positionsData.positions
        })
    }

    const getMedalColor = (position) => {
        switch (position){
            case 1:
                return "gold"
            case 2:
                return "silver"
            case 3:
                return "#761414"
            default:
                return "#761414"
        }
    }

    return(
        <>
            { positionsData.positions ?
            <>
                <button className="btn btn-primary winners" onClick={() => switchPositions()}><FontAwesomeIcon icon={faTrophy} /> Ganadores</button>
                <PositionsTable userScores={userScores} tournamentName={tournamentName} tournamentId={tournamentId}/>
            </>
            :
            <>
                <button className="btn btn-primary positions" onClick={() => switchPositions()}><FontAwesomeIcon icon={faRankingStar} /> Posiciones</button>
                    <div className="winnersTitle">
                        Ganadores de {tournamentName}
                    </div>
                <div className="winnersList">
                    {winners.map(winner =>{
                        position = position + 1 
                        return (
                            <div className="winner">
                                <FontAwesomeIcon className='medal' icon={faMedal} color={getMedalColor(position)} />
                                <div className="winnerName">
                                    <p className='fw-bold mb-1'>{winner.user.name}</p>
                                    <p className='text-muted mb-0'>{winner.user.username}</p>
                                </div>
                            </div>
                        )
                    })}
                </div> 
            </>          
            }
        </>
    )

}

export default TournamentWinners