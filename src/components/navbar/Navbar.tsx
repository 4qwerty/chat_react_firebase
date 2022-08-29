import React, {useContext} from 'react';
import {AppBar, Button, Grid, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTER} from "../../utils/consts";
import {Context} from "../../index";
import {signOut} from "firebase/auth";

import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <AppBar position="static" >
            <Toolbar variant={"dense"}>
                <Grid>
                    {user ?
                        <Button onClick={() => signOut(auth)} variant="contained">Вийти</Button>
                        :
                        <NavLink to={LOGIN_ROUTER}>
                            <Button variant="contained">Логін</Button>
                        </NavLink>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;