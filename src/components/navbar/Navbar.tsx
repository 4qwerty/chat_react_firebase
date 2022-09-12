import React, { useContext } from 'react'
import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTER, SING_UP_ROUTER, CHAT_ROUTER } from '../../utils/consts'
import { Context } from '../../index'
import { signOut } from 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'

const Navbar = () => {
    const navigate = useNavigate()
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)
    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar variant={'dense'}>
                <Grid>
                    {user ? (
                        <div>
                            <Button
                                onClick={() => {
                                    signOut(auth)
                                    navigate(LOGIN_ROUTER)
                                }}
                                style={{ color: '#ffff' }}
                            >
                                Logout
                            </Button>

                            <NavLink to={CHAT_ROUTER}>
                                <Button style={{ color: '#ffff' }}>Chat</Button>
                            </NavLink>
                        </div>
                    ) : (
                        <div>
                            <NavLink to={LOGIN_ROUTER}>
                                <Button style={{ color: '#ffff' }}>
                                    Login
                                </Button>
                            </NavLink>

                            <NavLink to={SING_UP_ROUTER}>
                                <Button style={{ color: '#ffff' }}>
                                    Sing up
                                </Button>
                            </NavLink>
                        </div>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
