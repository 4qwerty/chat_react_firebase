import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import { doc, setDoc, onSnapshot, addDoc, collection } from "firebase/firestore";

const Chat = () => {
    const {auth, db} = useContext(Context)
    const [user]: any = useAuthState(auth)
    const [value, setValue] = useState('')

    const sendMessage = async () => {

        const docRef = await addDoc(collection(db, "message"), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
        });

        console.log("Document written with ID: ", docRef.id);

    }

    return (
        <Container>
            <Grid container>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                >
                    <TextField
                        fullWidth
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Відправити</Button>
                </Grid>
            </Grid>
        </Container>
    );
};


export default Chat;