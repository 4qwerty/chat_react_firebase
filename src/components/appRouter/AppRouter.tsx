import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../../index'
import { privateRotes, publicRotes } from '../../routes/routes'

const AppRouter = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    return user ? (
        <Routes>
            {privateRotes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />}></Route>
            ))}
        </Routes>
    ) : (
        <Routes>
            {publicRotes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />}></Route>
            ))}
        </Routes>
    )
}

export default AppRouter
