import React, { useContext } from 'react'
import { Context } from '../../index'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { addDoc, collection } from 'firebase/firestore'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button } from '@mui/material'

const ButtonSingUpGoogle = () => {
    const { auth, db } = useContext(Context)
    const [users] = useCollectionData(collection(db, 'users'))

    const singUpGoogle = async () => {
        const provider = new GoogleAuthProvider()
        const { user } = await signInWithPopup(auth, provider)

        const check = users?.some((e) => {
            return e.uid === user.uid
        })

        if (!check) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            })
        }
    }

    return (
        <div>
            <Button onClick={singUpGoogle} variant="contained" color="success">
                Sign in with google
            </Button>
        </div>
    )
}

export default ButtonSingUpGoogle
