import React, {useContext} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import {Context} from "../../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"


const Login = () => {
    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(auth, provider)

        console.log(user)
    }

    return (
        <Container>
            <Grid
                container
                alignItems={"center"}
                direction={"column"}
            >
                <Grid
                    container
                    alignItems={"center"}
                    direction={"column"}
                >
                    <Box p={5}>
                        <Button onClick={login} variant="contained" color="success">Sign in with google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;