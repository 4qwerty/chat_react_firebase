import React, { useContext } from 'react'
import { Box, Button, Grid } from '@mui/material'
import SignUpForm from '../form/signUp/SignUpForm'
import ButtonSingUpGoogle from '../button/ButtonSingUpGoogle'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setUser } from '../../store/ reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Context } from '../../index'
import { addDoc, collection } from 'firebase/firestore'

const SignUp = () => {
    const dispatch = useDispatch()
    const { db, auth } = useContext(Context)

    const handleRegister = async (
        email: string,
        password: string,
        name: string
    ) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
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
                })
            })
            .catch(console.error)
    }

    return (
        <Grid container alignItems={'center'} direction={'column'}>
            <Box p={5}>
                <ButtonSingUpGoogle />
            </Box>

            <SignUpForm handleClick={handleRegister} />
        </Grid>
    )
}

export default SignUp
