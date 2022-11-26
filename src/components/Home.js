import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"
import { getCompetitions } from "../api/Requests"
import Navbar from "./Navbar";
import $ from "jquery";


const Home = () => {

    const [competitionsData, setCompetitionsData] = useState({
        competitions: []
    })

    const navigate = useNavigate(); 

    const [error, setError] = useState("")

    const showError = (message) => {
        setError(message)
        $('#alertReg').fadeTo(2000, 500).slideUp(500, () => {
            $('#alertReg').slideUp(500)
        })
    }

    const updateCompetitions = () => {
        getCompetitions()
        .then((response) => {
            setCompetitionsData({
                competitions: response.data
            })
        })
        .catch((error) => {
            if(error.response.data){
                showError(error.response.data)
            } else {
                showError("Falló la conexión con el servidor")
            }
        })
    }

    const competitionMatches = (id) => {
        navigate(`/matches/${id}`);
    };

    useEffect(() => {
        updateCompetitions();
        $('alert-competition').hide()
    },[]);

    return (
        <>  
            <header>
                <Navbar/>
            </header>
            <div class="home">
            { competitionsData.competitions.length > 0 &&
                (<div class="competitions">
                    {competitionsData.competitions.map(competition =>{
                        return(
                        <div class="competition">
                            <img src={competition.emblem} class="comppic" alt={competition.name} onClick={() => competitionMatches(competition.code)}/>
                            <div class="compText">{competition.name}</div>
                        </div>
                        )
                    })}
                </div>
                )}
            <div id= "alert-competition" className="alert alert-danger" role="alert">
                {error}
            </div>    
            </div>
        </>
    )

}

export default Home;