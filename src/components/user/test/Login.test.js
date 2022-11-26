import { render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { login } from "../../../api/Requests"
import Login from '../Login.js'

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

jest.mock("../../../api/Requests")

beforeEach(() => {
    login.mockClear()
})

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

    it('register button', async () => {
        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<Login/>}/>
            </Routes>
        </BrowserRouter>)

        const registerButton = screen.getByTestId('register-button')
        userEvent.click(registerButton)
        
        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
        })
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/register')
    })

    it('si intento ingresar con usuario no valido muestra un error', async () => {
        login.mockRejectedValue({response: {data: "Error"}})

        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<Login/>}/>
            </Routes>
        </BrowserRouter>)


        userEvent.click(screen.getByTestId('login-button'))
        
        await waitFor(() => {
            expect(screen.getByTestId('login-error')).toHaveTextContent("Error")
        })
    })

    it('cambio de inputs y login valido', async () => {
        login.mockImplementation(() => Promise.resolve({
            headers: {
                authtentication: "AUTH"
            },
            data : {
                username: "enzogalarza@gmail.com",
                id: 1,
                profileImage: "img.png"
            }
        }))

        render(<BrowserRouter>
            <Routes>
                <Route path="*" element={<Login/>}/>
            </Routes>
        </BrowserRouter>)

        const loginEmailInput = screen.getByTestId("login-email")
        const loginPassword = screen.getByTestId("login-password")

        userEvent.type(loginEmailInput, 'enzogalarza@gmail.com')
        userEvent.type(loginPassword, '123')
        userEvent.click(screen.getByTestId('login-button'))

        expect(screen.getByTestId("login-email").value).toBe('enzogalarza@gmail.com')
        expect(screen.getByTestId("login-password").value).toBe('123')
        expect(login).toHaveBeenCalledTimes(1)
        expect(login).toHaveBeenCalledWith({
            username: "enzogalarza@gmail.com",
            password: "123"
        })
        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
        })
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/home')
    })
})    