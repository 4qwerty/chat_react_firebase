import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import './Сhat.scss'
import { Context } from '../../index'
import { Avatar, Box, Button, Grid } from '@mui/material'
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
    const dummy = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const { auth, db } = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const users: UserValue[] = [] // useState
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
                id: doc.id,
                ...doc.data(),
            } as UserValue)
        })
    }

    useEffect(() => {
        getUsers()
    })

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

        dummy.current.scrollIntoView({ behavior: 'smooth' })

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
        <Box sx={{ width: '100%', height: '100%' }}>
            <Grid
                container
                rowSpacing={0}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid
                    item
                    xs={4}
                    sm={3}
                    md={2}
                    sx={{
                        fontSize: {
                            lg: 14,
                            sm: 12,
                            xs: 12,
                        },
                    }}
                >
                    <UsersList />
                </Grid>

                <Grid item xs={8} sm={9} md={10}>
                    <Box
                        className={'chatBox'}
                        sx={{
                            fontSize: {
                                lg: 14,
                                sm: 12,
                                xs: 12,
                            },
                        }}
                    >
                        {messages?.map((message) => (
                            <Box
                                key={message.createdAt}
                                className={'userBox'}
                                style={{
                                    marginLeft:
                                        user?.uid === message.uid
                                            ? 'auto'
                                            : '10px',
                                }}
                            >
                                <Grid container>
                                    <Avatar
                                        src={message.photoURL}
                                        sx={{ width: 24, height: 24 }}
                                    />
                                    <Box className={'userName'}>
                                        {message.displayName}
                                    </Box>
                                </Grid>
                                <Box>{message.text}</Box>
                            </Box>
                        ))}
                        <span ref={dummy}></span>
                    </Box>
                </Grid>
                <Grid item xs={4} sm={3} md={2} />

                <Grid item xs={8} sm={9} md={10} className={'inputBox'}>
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
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Chat
