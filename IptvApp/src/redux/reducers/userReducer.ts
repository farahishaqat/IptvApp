import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: <any>{}
};

const slice = createSlice({
    name: 'userReducer',
    initialState: initialState,
    reducers: {
        loginSuccess: (state = initialState, action) => {
            state.user = action.payload;
        },
        logoutSuccess: (state = initialState, action) => {
            state.user = null;
        }
    }
});

export default slice.reducer;
export const { loginSuccess, logoutSuccess } = slice.actions;