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
        setUser(state, action) {
            state.email = action.payload.email
            state.displayName = action.payload.displayName
            state.token = action.payload.token
            state.uid = action.payload.uid
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
