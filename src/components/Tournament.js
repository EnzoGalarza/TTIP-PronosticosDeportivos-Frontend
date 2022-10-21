import {getTournament} from "../api/Requests"
import { useNavigate } from "react-router-dom";

function Tournament({tournament, updateScores}){

    const navigate = useNavigate(); 

    const seeTournament = () => {
        navigate(`/tournaments/${tournament.name}`)
    }

    return(
        <tbody>
            <tr>    
                <td>{tournament.name}</td>
                <td>{tournament.competition}</td>
                <td><button onClick={() =>updateScores(tournament.id)}>Actualizar</button></td>
                <td><button onClick={() => seeTournament()}>Ver</button></td>
            </tr>    
        </tbody>
    )
}

export default Tournament;