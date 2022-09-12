import React, { useContext, useEffect } from 'react'
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
import { Avatar, Box, Grid } from '@mui/material'
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

    useEffect(() => {
        getConversation()
    })

    const getDocId = (interlocutor: DocumentData) => {
        getConversation()

        return conversation?.filter((e: ConversationValue) => {
            return e.uid.includes(user.uid) && e.uid.includes(interlocutor.uid)
        })
    }

    const sendPrivateMessage = async (interlocutor: DocumentData) => {
        const docId: ConversationValue[] = getDocId(interlocutor)
        console.log(docId)

        if (docId.length === 0) {
            await addDoc(collection(db, 'conversation'), {
                uid: [user.uid, interlocutor.uid],
            })

            const doc: ConversationValue[] = getDocId(interlocutor)

            navigate(PRIVATE_CORRESPONDENCE_ROUTER, {
                state: {
                    docId: doc[0].id,
                    uidInterlocutor: interlocutor.uid,
                },
            })
            return
        }

        navigate(PRIVATE_CORRESPONDENCE_ROUTER, {
            state: { docId: docId[0].id, uidInterlocutor: interlocutor.uid },
        })
    }

    return (
        <Box className={'usersList'}>
            {users?.map((user) => (
                <Grid
                    key={user.uid}
                    container
                    className={'user'}
                    onClick={() => sendPrivateMessage(user)}
                >
                    <Avatar
                        src={user.photoURL}
                        className={'userAvatar'}
                        sx={{ width: 26, height: 26 }}
                    />
                    <Box className={'userName'}>{user.displayName}</Box>
                </Grid>
            ))}
        </Box>
    )
}

export default UsersList
