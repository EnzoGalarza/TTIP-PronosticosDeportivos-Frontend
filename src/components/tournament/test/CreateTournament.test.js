import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateTournament from '../CreateTournament'


describe('Create Tournament', () => {
    it('estado inicial create tournament', async () => {
        
        render(<BrowserRouter>
                <Routes>
                    <Route path="*" element={<CreateTournament/>}/>
                </Routes>
            </BrowserRouter>)
        
        const tournamentName = screen.getByTestId('tournament-name')
        const tournamentTitle = screen.getByTestId('tournament-title')
        const createButton = screen.getByRole('button')
        
        expect(tournamentName).toHaveTextContent('')
        expect(tournamentTitle).toHaveTextContent('Nuevo torneo')
        expect(createButton).toHaveTextContent('Crear')
    })

    it('cambio nombre de torneo', () =>{
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<CreateTournament/>}/>
            </Routes>
        </BrowserRouter>)

        const tournamentName = screen.getByTestId('tournament-name')
        userEvent.type(tournamentName, 'Torneo nuevo')
    })
})