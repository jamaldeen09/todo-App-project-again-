
import { createSlice } from "@reduxjs/toolkit";

interface triggerStructure {
    showCompleted: boolean
}

const initialState:triggerStructure  = {
    showCompleted: false
}

const completedTriggerSlice = createSlice({
    initialState,
    name: "triggerComp",
    reducers: {
        activateTrig: (state) => {
            state.showCompleted = true
        },
        deactivateTrig: (state) => {
            state.showCompleted = false
        }
    }
})

export const { activateTrig,deactivateTrig } = completedTriggerSlice.actions;
export default completedTriggerSlice.reducer;