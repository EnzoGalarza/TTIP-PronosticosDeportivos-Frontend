import "../styles/Matches.css"
import NumericInput from 'react-numeric-input'
import 'bootstrap/dist/css/bootstrap.min.css'


function Match({match, getPredictionGoals, updateGoal}){
    {
        return(
        <div id= "match" className="card">
            <div className="card-header">
                    {match.status === "SCHEDULED" || match.status === "TIMED" ? match.localDate : match.status}
            </div> 

            <div id= "matchBody" className="card-body">
                <div className="team"> 
                        <img src={match.homeTeam.crest} className="teamCrest" alt={match.homeTeam.name} />
                        <div className="teamName">{match.homeTeam.name}</div>
                </div>     

                <div className="goals">
                        {match.status === "FINISHED" ? 
                        <div className="result">
                            Resultado: <br></br>
                            {match.score.fullTime.home} - {match.score.fullTime.away}
                            <br></br>
                            {getPredictionGoals(match.code, "HOME") !== null &&
                             getPredictionGoals(match.code, "AWAY") !== null ?
                                <div>
                                    Tu Pronóstico: <br></br>
                                    {getPredictionGoals(match.id, "HOME")} - {getPredictionGoals(match.id, "AWAY")}
                                </div>
                                : 
                                <div>
                                    Sin pronosticar
                                </div>
                            }
                        </div>
                        : 
                        <div className="prediction">
                            <NumericInput 
                                      min={0} 
                                      value={getPredictionGoals(match.id, "HOME")}
                                      className="localResInput"
                                      placeholder="Local"
                                      onChange={value => updateGoal(match, "HOME", value)}
                                      />
                            <NumericInput 
                                      min={0}
                                      value={getPredictionGoals(match.id, "AWAY")}
                                      className="awayResInput"
                                      placeholder="Visitante"
                                      onChange={value => updateGoal(match, "AWAY", value)}
                                      />
                        </div>
                        }
                </div> 
                    
                <div className="team">
                        <img src={match.awayTeam.crest} className="teamCrest" alt={match.awayTeam.name} />
                        <div className="teamName">{match.awayTeam.name}</div>
                </div>
            </div>
        </div>
        
        
        )
    }
}

export default Match