import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../../index'
import { CHAT_ROUTER, LOGIN_ROUTER } from '../../utils/consts'
import { Box, LinearProgress } from '@mui/material'
import { privateRotes, publicRotes } from '../../routes/routes'

const AppRouter = () => {
    const { auth } = useContext(Context)
    const [user, loading] = useAuthState(auth)

    if (loading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    return user ? (
        <Routes>
            {privateRotes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />}></Route>
            ))}
            <Route index element={<Navigate to={CHAT_ROUTER} />} />
        </Routes>
    ) : (
        <Routes>
            {publicRotes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />}></Route>
            ))}
            <Route index element={<Navigate to={LOGIN_ROUTER} />} />
        </Routes>
    )
}

export default AppRouter
