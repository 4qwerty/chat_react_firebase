import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../../index'
import {
    CHAT_ROUTER,
    LOGIN_ROUTER,
    PRIVATE_CORRESPONDENCE_ROUTER,
    SING_UP_ROUTER,
} from '../../utils/consts'
import Chat from '../chat/Chat'
import PrivateCorrespondence from '../privateCorrespondence/PrivateCorrespondence'
import Login from '../login/Login'
import SignUp from '../signUp/SignUp'

const AppRouter = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    console.log(user)

    return user ? (
        <Routes>
            <Route index element={<Navigate to={CHAT_ROUTER} />} />
            <Route path={CHAT_ROUTER} element={<Chat />}></Route>
            <Route
                path={PRIVATE_CORRESPONDENCE_ROUTER}
                element={<PrivateCorrespondence />}
            ></Route>
        </Routes>
    ) : (
        <Routes>
            <Route index element={<Navigate to={LOGIN_ROUTER} />} />
            <Route path={LOGIN_ROUTER} element={<Login />}></Route>
            <Route path={SING_UP_ROUTER} element={<SignUp />}></Route>
        </Routes>
    )
}

export default AppRouter
