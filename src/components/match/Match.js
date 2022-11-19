import "../../styles/Matches.css"
import NumericInput from 'react-numeric-input'
import 'bootstrap/dist/css/bootstrap.min.css'
import Team from "./Team";

const weekDayFormatter = (input) => {
    switch (input) {
        case 'MONDAY':
          return 'Lunes'
        case 'TUESDAY':
          return 'Martes'
        case 'WEDNESDAY':
          return 'Miércoles'
        case 'THURSDAY':
            return 'Jueves'
        case 'FRIDAY':
            return 'Viernes'
        case 'SATURDAY':
            return 'Sábado'
        case 'SUNDAY':
            return 'Domingo'
        default:
            break;    
      }
}

const matchStatusFormatter = (input) => {
    switch (input) {
        case 'LIVE':
          return 'Vivo'
        case 'IN_PLAY':
          return 'En juego'
        case 'PAUSED':
            return 'Entretiempo'
        case 'FINISHED':
            return 'Finalizado'
        case 'POSTPONED':
            return 'Pospuesto'
        case 'SUSPENDED':
            return 'Suspendido'
        case 'CANCELLED':
            return 'Cancelado'
        default:
            break    
      }
}

function Match({match, getPredictionGoals, updateGoal}){
    
        return(
        <div id= "match" className="card">
            <div className="card-header">
                    {match.status === "SCHEDULED" || match.status === "TIMED" ? `${weekDayFormatter(match.weekDay)} ${match.localDate}` : matchStatusFormatter(match.status)}
            </div> 

            <div id= "matchBody" className="card-body">
                <Team name={match.homeTeam.name} crest={match.homeTeam.crest}/>    
                <div className="goals">
                        {match.status === "FINISHED" ? 
                        <div className="result">
                            Resultado: <br></br>
                            {match.score.fullTime.home} - {match.score.fullTime.away}
                            <br></br>
                            {getPredictionGoals(match.id, "HOME") !== null &&
                             getPredictionGoals(match.id, "AWAY") !== null ?
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
                <Team name={match.awayTeam.name} crest={match.awayTeam.crest}/> 
            </div>
        </div>
        
        
        )
    
}

export default Match