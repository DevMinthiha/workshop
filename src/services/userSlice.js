import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { value: {} },
    reducers: {
        login: (state, {payload}) => {
            state.value = payload;
        },
        logout: (state, {payload}) => {
            state.value = payload;
        }
    }
})

export const {login, logout } = userSlice.actions
export default userSlice.reducer