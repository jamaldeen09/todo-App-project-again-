import { createSlice } from "@reduxjs/toolkit";

interface originalState {
    uncompletedTrigger: boolean
}

const initialState: originalState = {
    uncompletedTrigger: false
}

const uncompletedTrigSlice = createSlice({
    initialState,
    name: "uncompletedTrigg",
    reducers: {
        activateUncompleted: (state) => {
            state.uncompletedTrigger = true
        },
        deactivateUncompleted: (state) => {
            state.uncompletedTrigger = false
        }
    }
})

export const { activateUncompleted, deactivateUncompleted } = uncompletedTrigSlice.actions;
export default uncompletedTrigSlice.reducer;