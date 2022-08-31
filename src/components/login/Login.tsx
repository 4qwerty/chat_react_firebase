import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import LoginForm from '../form/loginForm/LoginForm'
import ButtonSingUpGoogle from '../button/ButtonSingUpGoogle'

const Login = () => {
    return (
        <Grid container alignItems={'center'} direction={'column'}>
            <Box p={5}>
                <ButtonSingUpGoogle />
            </Box>

            <LoginForm />
        </Grid>
    )
}

export default Login
