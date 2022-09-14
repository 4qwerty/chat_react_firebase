import React, { useContext, useMemo, useState } from 'react'
import { Context } from '../../index'
import './PrivateCorrespondence.scss'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, where, query } from 'firebase/firestore'
import {
    useCollectionData,
    useCollectionDataOnce,
} from 'react-firebase-hooks/firestore'
import UsersList from '../usersList/UsersList'
import { Avatar, Box, Button, Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useLocation, Location } from 'react-router-dom'

interface StateValue {
    docId: string
    uidInterlocutor: string
}

interface LocationProps extends Location {
    state: StateValue
}

const PrivateCorrespondence = () => {
    const dummy = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const { state } = useLocation() as LocationProps
    const { auth, db } = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const interlocutorRef = collection(db, 'users')
    const [interlocutor] = useCollectionDataOnce(
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
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter' || event.key === 'NumEnter') {
            event.preventDefault()
            event.stopPropagation()
            sendMessage()
        }
    }
    return (
        <Grid container>
            <Grid
                item
                xs={5}
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

            <Grid item xs={7} sm={9} md={10}>
                <Grid container className={'informationMember'}>
                    <Avatar
                        className={'userAvatar'}
                        src={member?.photoURL}
                        sx={{ width: 30, height: 30 }}
                    />
                    <Box className={'userName'}>{member?.displayName}</Box>
                </Grid>

                <Grid>
                    <Box
                        className={'privateCorrespondenceBox'}
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

                <Grid className={'inputBox'}>
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
        </Grid>

        // <Box sx={{ width: '100%', height: '100%' }}>
        //     <Grid
        //         container
        //         rowSpacing={0}
        //         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        //     >
        //         <Grid item xs={4} sm={3} md={2}></Grid>
        //         <Grid
        //             item
        //             xs={8}
        //             sm={9}
        //             md={10}
        //             className={'informationMember'}
        //         >
        //             <Avatar
        //                 className={'userAvatar'}
        //                 src={member?.photoURL}
        //                 sx={{ width: 30, height: 30 }}
        //             />
        //             <Box className={'userName'}>{member?.displayName}</Box>
        //         </Grid>
        //
        //         <Grid
        //             item
        //             xs={4}
        //             sm={3}
        //             md={2}
        //             sx={{
        //                 fontSize: {
        //                     lg: 14,
        //                     sm: 12,
        //                     xs: 12,
        //                 },
        //             }}
        //         >
        //             <UsersList />
        //         </Grid>
        //
        //         <Grid item xs={8} sm={9} md={10}>
        //             <Box
        //                 className={'privateCorrespondenceBox'}
        //                 sx={{
        //                     fontSize: {
        //                         lg: 14,
        //                         sm: 12,
        //                         xs: 12,
        //                     },
        //                 }}
        //             >
        //                 {messages?.map((message) => (
        //                     <Box
        //                         key={message.createdAt}
        //                         className={'userBox'}
        //                         style={{
        //                             marginLeft:
        //                                 user?.uid === message.uid
        //                                     ? 'auto'
        //                                     : '10px',
        //                         }}
        //                     >
        //                         <Grid container>
        //                             <Avatar
        //                                 src={message.photoURL}
        //                                 sx={{ width: 24, height: 24 }}
        //                             />
        //                             <Box className={'userName'}>
        //                                 {message.displayName}
        //                             </Box>
        //                         </Grid>
        //                         <Box>{message.text}</Box>
        //                     </Box>
        //                 ))}
        //                 <span ref={dummy}></span>
        //             </Box>
        //         </Grid>
        //         <Grid item xs={4} sm={3} md={2} />
        //
        //         <Grid item xs={8} sm={9} md={10} className={'inputBox'}>
        //             <input
        //                 value={value}
        //                 onKeyDown={onKeyDown}
        //                 onChange={(e) => setValue(e.target.value)}
        //                 placeholder="Написати повідомлення..."
        //             />
        //             <Button
        //                 disabled={!value}
        //                 onClick={sendMessage}
        //                 type="submit"
        //                 startIcon={<SendIcon />}
        //             />
        //         </Grid>
        //     </Grid>
        // </Box>
    )
}

export default PrivateCorrespondence
