import React, { useContext } from 'react'
import {
    addDoc,
    collection,
    DocumentData,
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

interface ConversationValue {
    id: string
    uid: string[]
}

const UsersList = () => {
    const { db, auth } = useContext(Context)
    const [user]: any = useAuthState(auth)
    const navigate = useNavigate()
    const usersRef = collection(db, 'users')
    const [users] = useCollectionData(
        query(usersRef, where('uid', '!=', user.uid))
    )
    const conversation: ConversationValue[] = []

    const getConversation = async () => {
        const q = query(collection(db, 'conversation'))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            conversation.push({ uid: [], id: doc.id, ...doc.data() })
        })
    }

    getConversation()

    const sendPrivateMessage = async (interlocutor: DocumentData) => {
        const docId: ConversationValue[] = conversation?.filter(
            (e: ConversationValue) => {
                return (
                    e.uid.includes(user.uid) && e.uid.includes(interlocutor.uid)
                )
            }
        )

        if (docId.length === 0) {
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
