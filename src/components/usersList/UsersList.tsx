import React, { useContext } from 'react'
import {
    addDoc,
    collection,
    DocumentData,
    orderBy,
    query,
} from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Context } from '../../index'
import { Avatar, Grid } from '@mui/material'
import './UsersList.scss'
import { useAuthState } from 'react-firebase-hooks/auth'

const UsersList = () => {
    const { db, auth } = useContext(Context)
    const [user]: any = useAuthState(auth)

    const usersRef = collection(db, 'users')
    const [users] = useCollectionData(
        query(usersRef, orderBy('displayName', 'asc'))
    )

    const sendPrivateMessage = async (user: DocumentData) => {
        await addDoc(collection(db, 'conversation '), {
            uid: user.uid,
            displayName: user.displayName,
        })
    }

    return (
        <div className={'usersList'}>
            <Grid container>
                {users?.map((user) => (
                    <Grid
                        container
                        className={'user'}
                        onClick={() => sendPrivateMessage(user)}
                    >
                        <Avatar src={user.photoURL} />
                        <div>{user.displayName}</div>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default UsersList
