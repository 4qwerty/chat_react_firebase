import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    displayName: null,
    token: null,
    uid: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserSingUp(state, action) {
            return { ...state, ...action.payload }
        },
        setUserLogin(state, action) {
            return { ...state, ...action.payload }
        },
    },
})

export const { setUserSingUp, setUserLogin } = userSlice.actions

export default userSlice.reducer
