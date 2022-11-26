import { render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { registerUser } from '../../../api/Requests'
import { BrowserRouter } from 'react-router-dom'
import Register from '../Register'

jest.mock("../../../api/Requests")

describe('Register', () => {
    
    it('estado inicial Register', async () => {
        render(<BrowserRouter>
            <Register/>
        </BrowserRouter>)
        
        const registerTitle = screen.getByTestId('register-title')
        const registerName = screen.getByTestId('register-name')
        const registerEmail = screen.getByTestId('register-email')
        const registerPassword = screen.getByTestId('register-password')
        const registerImg = screen.getByTestId('register-img')
        const registerButton = screen.getByTestId('register-button')

        expect(registerTitle).toHaveTextContent('Registrarme')
        expect(registerName).toHaveTextContent('')
        expect(registerEmail).toHaveTextContent('')
        expect(registerPassword).toHaveTextContent('')
        expect(registerImg).toHaveAttribute('src')
        expect(screen.getByTestId('register-error')).not.toBeVisible()
        expect(registerButton).toHaveTextContent('Registrarme')    
    })

    it('cambio de estado nombre, email, password', async () => {
        render(<BrowserRouter>
            <Register/>
        </BrowserRouter>)

        const registerName = screen.getByTestId('register-name')
        const registerEmail = screen.getByTestId('register-email')
        const registerPassword = screen.getByTestId('register-password')

        userEvent.type(registerName, 'Nombre')
        userEvent.type(registerEmail, "nombre@gmail.com")
        userEvent.type(registerPassword, '123')

        expect(screen.getByTestId('register-name').value).toBe('Nombre')
        expect(screen.getByTestId('register-email').value).toBe('nombre@gmail.com')
        expect(screen.getByTestId('register-password').value).toBe('123')
    })

    it('registrar sin email muestra error', async () => {
        registerUser.mockImplementation(() => Promise.reject({response : {data : "Error"}}))
        render(<BrowserRouter>
            <Register/>
        </BrowserRouter>)

        userEvent.click(screen.getByTestId('register-button'))

        await waitFor(() => {
            expect(screen.getByTestId('register-error')).toHaveTextContent("Error")
        })
    })
})    