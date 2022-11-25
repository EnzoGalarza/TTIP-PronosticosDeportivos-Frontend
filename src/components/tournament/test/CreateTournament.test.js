import "@testing-library/jest-dom"
import { getCompetitions } from "../../../api/Requests"
import { render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateTournament from '../CreateTournament'
import { act } from "react-dom/test-utils"

jest.mock('../../../api/Requests')

describe('Create Tournament', () => {
    

    it('estado inicial create tournament', async () => {
        const mockedCompetitions = {data: [{name: 'Serie A', code: 'SA'},{name: 'Primera Division', code: 'PD'}]}
        getCompetitions.mockResolvedValue(mockedCompetitions)
        
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
        const mockedCompetitions = {data: [{name: 'Serie A', code: 'SA'},{name: 'Primera Division', code: 'PD'}]}
        getCompetitions.mockResolvedValue(mockedCompetitions)
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<CreateTournament/>}/>
            </Routes>
        </BrowserRouter>)

        const tournamentName = screen.getByTestId('tournament-name')
        
        userEvent.type(tournamentName, 'Torneo nuevo')
        
        expect(screen.getByTestId('tournament-name').value).toBe('Torneo nuevo')

    })

    it('estado inicial competicion', async () =>{
        const mockedCompetitions = {data: [{name: 'Serie A', code: 'SA'},{name: 'Primera Division', code: 'PD'}]}
        getCompetitions.mockResolvedValue(mockedCompetitions)
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<CreateTournament/>}/>
            </Routes>
        </BrowserRouter>)

        await waitFor(() => {
            let options = screen.getAllByTestId('competition-option')
            expect(options[0].selected).toBeTruthy()
            expect(options[1].selected).toBeFalsy()
        })
        
        
    })

    it('cambio de competicion', async () =>{
        const mockedCompetitions = {data: [{name: 'Serie A', code: 'SA'},{name: 'Primera Division', code: 'PD'}]}
        getCompetitions.mockResolvedValue(mockedCompetitions)
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<CreateTournament/>}/>
            </Routes>
        </BrowserRouter>)
        

        await waitFor(() => {
            userEvent.selectOptions(screen.getByTestId('competition'), 'PD')
            let options = screen.getAllByTestId('competition-option')
            expect(options[0].selected).toBeFalsy()
            expect(options[1].selected).toBeTruthy()
        })
        
        
    })

    it('criterios de puntuación', async () =>{
        const mockedCompetitions = {data: [{name: 'Serie A', code: 'SA'},{name: 'Primera Division', code: 'PD'}]}
        getCompetitions.mockResolvedValue(mockedCompetitions)
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<CreateTournament/>}/>
            </Routes>
        </BrowserRouter>)
        

        await waitFor(() => {
            let select = screen.getByLabelText(/Criterios/i)
            
            userEvent.click(select)
            
            expect(screen.getByText("Resultado completo")).toBeInTheDocument()
            expect(screen.getByText("Resultado parcial")).toBeInTheDocument()
            expect(screen.getByText("Acercamiento")).toBeInTheDocument()
            expect(screen.getByText("Ganador")).toBeInTheDocument()
            expect(screen.queryByTestId("criterio-tournament")).not.toBeInTheDocument()
        })
        
        
    })

    it('seleccionar un criterio de puntuación', async () =>{
        const mockedCompetitions = {data: [{name: 'Serie A', code: 'SA'},{name: 'Primera Division', code: 'PD'}]}
        getCompetitions.mockResolvedValue(mockedCompetitions)
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<CreateTournament/>}/>
            </Routes>
        </BrowserRouter>)
        

        await waitFor(() => {
            let select = screen.getByLabelText(/Criterios/i)
            
            userEvent.click(select)
            
            userEvent.click(screen.getByText("Resultado completo"))
            
            expect(screen.queryByTestId("criterio-tournament")).toBeInTheDocument()
        })
        
        
    })
})