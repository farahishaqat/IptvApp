import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: 0
}

const slice = createSlice({
    name: 'loadingReducer',
    initialState: initialState,
    reducers: {
        updateIsLoading: (state = initialState, action) => {
            state.isLoading = action.payload;
        }
    }
});

export default slice.reducer;
export const { updateIsLoading } = slice.actions;