import React, { useContext, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import './Сhat.scss'
import { Context } from '../../index'
import { Avatar, Button, Container, Grid } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { addDoc, collection, query, orderBy } from 'firebase/firestore'
import UsersList from '../usersList/UsersList'

const Chat = () => {
    const { auth, db } = useContext(Context)
    const [user]: any = useAuthState(auth)
    const [value, setValue] = useState('')
    const messageRef = collection(db, 'messages')
    const [messages] = useCollectionData(
        query(messageRef, orderBy('createdAt', 'asc'))
    )

    const sendMessage = async () => {
        await addDoc(collection(db, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: new Date().toLocaleString(),
        })

        setValue('')
    }

    return (
        <div>
            <div className={'chatWindow'}>
                <UsersList />

                <div className={'chatBox'}>
                    {messages?.map((message) => (
                        <div
                            className={'userBox'}
                            style={{
                                marginLeft:
                                    user.uid === message.uid ? 'auto' : '10px',
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
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Написати повідомлення..."
                />
                <Button
                    onClick={sendMessage}
                    type="submit"
                    startIcon={<SendIcon />}
                    className={'submitButton'}
                />
            </div>
        </div>
    )
}

export default Chat
