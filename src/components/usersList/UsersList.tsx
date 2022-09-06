import React, { useContext } from 'react'
import {
    addDoc,
    collection,
    DocumentData,
    orderBy,
    query,
    getDocs,
    where,
} from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Context } from '../../index'
import { Avatar, Grid } from '@mui/material'
import './UsersList.scss'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_CORRESPONDENCE_ROUTER } from '../../utils/consts'

interface DocIdValue {
    id: string
    uid: [string, string]
}

const UsersList = () => {
    const { db, auth } = useContext(Context)
    const [user]: any = useAuthState(auth)
    const navigate = useNavigate()
    const usersRef = collection(db, 'users')
    const [users] = useCollectionData(
        query(usersRef, where('uid', '!=', user.uid))
    )

    const conversation: any = []

    const getConversation = async () => {
        const q = query(collection(db, 'conversation'))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            conversation.push({ id: doc.id, ...doc.data() })
        })
    }

    getConversation()

    const sendPrivateMessage = async (interlocutor: DocumentData) => {
        const docId: DocIdValue[] = conversation?.filter((e: DocIdValue) => {
            return e.uid.includes(user.uid) && e.uid.includes(interlocutor.uid)
        })

        if (docId.length === 0) {
            console.log(docId)
            await addDoc(collection(db, 'conversation'), {
                uid: [user.uid, interlocutor.uid],
            })
        }

        navigate(PRIVATE_CORRESPONDENCE_ROUTER, {
            state: { docId: docId[0].id, uidInterlocutor: interlocutor.uid },
        })
    }

    return (
        <div className={'usersList'}>
            <Grid container>
                {users?.map((user) => (
                    <Grid
                        key={user.uid}
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
