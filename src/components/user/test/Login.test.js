import { render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../Login.js'

describe('Login', () => {
    it('estado inicial Login', async () => {
        render(<BrowserRouter>
                <Routes>
                    <Route path="*" element={<Login/>}/>
                </Routes>
            </BrowserRouter>)
        
        const loginTitle = screen.getByTestId("login-title")
        const registerText = screen.getByTestId("register-text")
        const loginEmailInput = screen.getByTestId("login-email")
        const loginPassword = screen.getByTestId("login-password")

        expect(registerText).toHaveTextContent('¿No tenés tu cuenta aún?')
        expect(loginTitle).toHaveTextContent('Ingresá')
        expect(loginEmailInput).toHaveTextContent('')
        expect(loginPassword).toHaveTextContent('')
        expect(screen.getByTestId('login-error')).not.toBeVisible()  
    })

    it('si intento ingresar con usuario no valido muestra un error', async () => {
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<Login/>}/>
            </Routes>
        </BrowserRouter>)


        userEvent.click(screen.getByTestId('login-button'))


        await waitFor(() => {
            expect(screen.getByTestId('login-error')).toBeVisible()
        })
    })
})    