import React, { useContext, useMemo, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import './Сhat.scss'
import { Context } from '../../index'
import { Avatar, Button, Grid } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
    addDoc,
    collection,
    query,
    orderBy,
    updateDoc,
    increment,
    doc,
    getDocs,
} from 'firebase/firestore'
import UsersList from '../usersList/UsersList'

interface UserValue {
    activity: number
    displayName: string
    id: string
    photoURL: string
    uid: string
}

const Chat = () => {
    const { auth, db } = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const users: UserValue[] = []
    const messageRef = collection(db, 'messages')
    const [mess] = useCollectionData(
        query(messageRef, orderBy('createdAt', 'asc'))
    )

    const messages = useMemo(() => {
        return mess?.filter((e) => !e.conversation)
    }, [mess])

    const getUsers = async () => {
        const q = query(collection(db, 'users'))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            users.push({
                activity: 0,
                displayName: '',
                photoURL: '',
                uid: '',
                id: doc.id,
                ...doc.data(),
            })
        })
    }

    getUsers()

    const sendMessage = async () => {
        const userId = users?.filter((e: UserValue) => {
            return e.uid === user?.uid
        })

        await addDoc(collection(db, 'messages'), {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            text: value,
            createdAt: new Date().toLocaleString(),
        })
        setValue('')

        await updateDoc(doc(db, 'users', userId[0].id), {
            activity: increment(1),
        })
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
            <div className={'chatWindow'}>
                <UsersList />

                <div className={'chatBox'}>
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

export default Chat
