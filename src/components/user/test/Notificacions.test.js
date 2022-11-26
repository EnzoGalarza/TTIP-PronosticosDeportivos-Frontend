import { render, screen} from '@testing-library/react'
import { getNotifications } from "../../../api/Requests"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notifications from '../Notifications'

jest.mock('../../../api/Requests')

describe('Notifications', () => {
    it('cuando no hay notificaciones se muestra un mensaje', async () => {
        const mockNotifications = {data: [{}]}
        getNotifications.mockResolvedValue(mockNotifications)
        render(<BrowserRouter>
                <Routes>
                    <Route path="*" element={<Notifications/>}/>
                </Routes>
            </BrowserRouter>)
        
        const message = await screen.findByTestId("no-notifications")

        expect(message).toBeInTheDocument()
    })

    it('cuando hay notificaciones', async () => {
        const mockNotifications = {data: [{acceptable: true,id: 2,message: "Invitación al torneo Probando",tournamentId: 3}]}
        getNotifications.mockResolvedValue(mockNotifications)
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<Notifications/>}/>
            </Routes>
        </BrowserRouter>)
        
        const notifications = await screen.findAllByTestId("notification-message")

        expect(notifications[0]).toHaveTextContent('Invitación al torneo Probando')
    })
})    