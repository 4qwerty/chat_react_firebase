import React, { useContext } from 'react'
import { Box, Grid } from '@mui/material'
import SignUpForm from '../form/signUp/SignUpForm'
import ButtonSingUpGoogle from '../button/ButtonSingUpGoogle'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setUserSingUp } from '../../store/ reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Context } from '../../index'
import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { CHAT_ROUTER } from '../../utils/consts'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { db, auth } = useContext(Context)

    const handleRegister = async (
        email: string,
        password: string,
        name: string
    ) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUserSingUp({
                        email: user.email,
                        displayName: name,
                        id: user.uid,
                        token: user.getIdToken(),
                    })
                )

                addDoc(collection(db, 'users'), {
                    uid: user.uid,
                    displayName: name,
                    photoURL: user.photoURL,
                    activity: 0,
                })
                navigate(CHAT_ROUTER, { replace: true })
            })
            .catch(console.error)
    }

    return (
        <Grid container alignItems={'center'} direction={'column'}>
            <Box p={5}>
                <ButtonSingUpGoogle />
            </Box>

            <SignUpForm handleRegister={handleRegister} />
        </Grid>
    )
}

export default SignUp
