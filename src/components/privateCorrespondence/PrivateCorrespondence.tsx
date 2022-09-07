import React, { useContext, useMemo, useState } from 'react'
import { Context } from '../../index'
import './PrivateCorrespondence.scss'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, where, query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import UsersList from '../usersList/UsersList'
import { Avatar, Button, Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useLocation } from 'react-router-dom'

interface StateValue {
    docId: string
    uidInterlocutor: string
}

const PrivateCorrespondence = () => {
    const { state }: any = useLocation()
    const { auth, db } = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const interlocutorRef = collection(db, 'users')
    const [interlocutor] = useCollectionData(
        query(interlocutorRef, where('uid', '==', state.uidInterlocutor))
    )
    const member = interlocutor?.[0]
    const messageRef = collection(db, 'messages')
    const [mess] = useCollectionData(
        query(messageRef, where('conversation', '==', state.docId))
    )
    const messages = useMemo(() => {
        return mess?.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    }, [mess])

    const sendMessage = async () => {
        await addDoc(collection(db, 'messages'), {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            text: value,
            createdAt: new Date().toLocaleString(),
            conversation: state.docId,
        })

        setValue('')
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter' || event.key === 'NumEnter') {
            event.preventDefault()
            event.stopPropagation()
            sendMessage()
        }
    }

    return (
        <div>
            <div className={'informationMember'}>
                <Avatar src={member?.photoURL} />
                <div>{member?.displayName}</div>
            </div>

            <div className={'privateCorrespondenceWindow'}>
                <UsersList />

                <div className={'privateCorrespondenceBox'}>
                    {messages?.map((message) => (
                        <div
                            key={message.createdAt}
                            className={'userBox'}
                            style={{
                                marginLeft:
                                    user?.uid === message.uid ? 'auto' : '10px',
                            }}
                        >
                            <Grid container>
                                <Avatar src={message.photoURL} />
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={'sendMessageBox'}>
                <input
                    value={value}
                    onKeyDown={onKeyDown}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Написати повідомлення..."
                />
                <Button
                    disabled={!value}
                    onClick={sendMessage}
                    type="submit"
                    startIcon={<SendIcon />}
                    className={'submitButton'}
                />
            </div>
        </div>
    )
}

export default PrivateCorrespondence
