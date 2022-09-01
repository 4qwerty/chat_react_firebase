import React, { useContext } from 'react'
import { Box, Grid } from '@mui/material'
import ButtonSingUpGoogle from '../button/ButtonSingUpGoogle'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { setUserLogin } from '../../store/ reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../index'
import LoginForm from '../form/loginForm/LoginForm'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { auth } = useContext(Context)

    const handleLogin = async (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUserLogin({
                        email: user.email,
                        id: user.uid,
                        token: user.getIdToken(),
                    })
                )
                navigate('../chat', { replace: true })
            })
            .catch(console.error)
    }
    return (
        <Grid container alignItems={'center'} direction={'column'}>
            <Box p={5}>
                <ButtonSingUpGoogle />
            </Box>

            <LoginForm handleLogin={handleLogin} />
        </Grid>
    )
}

export default Login
