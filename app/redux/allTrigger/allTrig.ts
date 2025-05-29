import { createSlice } from "@reduxjs/toolkit"

interface originalState {
    allTrigger: boolean
}

const initialState: originalState = {
    allTrigger: false
}

const allTrigSlice = createSlice({
    initialState,
    name: "allTrig",
    reducers: {
        activateAll: (state) => {
            state.allTrigger = true
        },
        deactivateAll: (state) => {
            state.allTrigger = false
        }
    }
})

export const { activateAll,deactivateAll } = allTrigSlice.actions;
export default allTrigSlice.reducer;