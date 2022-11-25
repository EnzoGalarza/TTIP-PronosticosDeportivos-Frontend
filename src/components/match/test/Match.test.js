import { render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Match from '../Match'

const mockMatchFinished = () => {
    return {   
        awayTeam: {name: 'Blackpool FC', tla: 'BLA', crest: 'blackpool.png'},
        homeTeam: {name: 'Burnley FC', tla: 'BUR', crest: 'burnley.png'},
        id: 422431,
        localDate: "13/11/2022 09:30",
        matchday: 21,
        score: {winner: '', 
                fullTime: {
                    away: 0, home: 3
                }
        },
        status: "FINISHED",
        utcDate: "2022-11-13T12:30:00",
        weekDay: "SUNDAY"
    }
}

const mockMatchNotStarted = () => {
    return {
        awayTeam: {name: 'Rayo Vallecano de Madrid', tla: 'RAY', crest: 'vallecano.png'},
        homeTeam: {name: 'Girona FC', tla: 'GIR', crest: 'girona.png'},
        id: 419149,
        localDate: "29/12/2022 13:00",
        matchday: 15,
        score: {winner: null, fullTime: {home: null, away: null}},
        status: "TIMED",
        utcDate: "2022-12-29T16:00:00",
        weekDay: "THURSDAY",
    }
}

const mockPredictionGoals = (code, team) => {
    return team === "HOME" ? 0 : 3
}

const mockNotPrediction = (code, team) => {
    return null
}

const updatePrediction = (match, team, goals) => {
    return goals
}

describe('Match', () => {
    it('Match nombreLocal, imgLocal, nombreVisitante, imgVisitante, goles y pronóstico', async () => {
        render(<Match match={mockMatchFinished()} getPredictionGoals={mockPredictionGoals}/>)
        
        const teams = screen.getAllByTestId("team")
        const local = teams[0]
        const visitante = teams[1]
        const goals = screen.getByTestId("goals")
        const pronostic = screen.getByTestId("pronostic")


        expect(local).toHaveTextContent('Burnley FC')
        expect(local.getElementsByTagName('img')[0].src).toBe('http://localhost/burnley.png')
        expect(visitante).toHaveTextContent('Blackpool FC')
        expect(visitante.getElementsByTagName('img')[0].src).toBe('http://localhost/blackpool.png')
        expect(goals.getElementsByClassName("result")[0]).toHaveTextContent("Resultado: 3 - 0")
        expect(pronostic).toHaveTextContent("Tu Pronóstico: 0 - 3")
    })

    it('Partido finalizado sin pronóstico', async () => {
        render(<Match match={mockMatchFinished()} getPredictionGoals={mockNotPrediction}/>)

        expect(screen.getByTestId("pronostic")).toHaveTextContent("Sin pronosticar")
    })

    it('Partido sin comenzar se visualiza para pronosticar', async () => {
        render(<Match match={mockMatchNotStarted()} getPredictionGoals={() => {return null}}/>) 

        const localPronostic = screen.getByTestId("local-pronostic")
        const awayPronostic = screen.getByTestId("away-pronostic")

        expect(localPronostic.value).toBe("")
        expect(awayPronostic.value).toBe("")
    })

    it('Cambiar input de pronóstico de partido sin comenzar', async () => {
        render(<Match match={mockMatchNotStarted()} updateGoal={updatePrediction} getPredictionGoals={() => {return null}}/>) 

        const localPronostic = screen.getByTestId("local-pronostic")
        const awayPronostic = screen.getByTestId("away-pronostic")

        userEvent.type(localPronostic, "3")
        userEvent.type(awayPronostic,"4")

        expect(screen.getByTestId("local-pronostic").value).toBe("3")
        expect(screen.getByTestId("away-pronostic").value).toBe("4")
    })

    
})