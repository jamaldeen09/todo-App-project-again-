import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Payload } from "../ToDo-Essentials/TodoReducer"

interface completedState {
    completed: Payload[]
}

const initialState:completedState = {
    completed: []
}

const completedSlice = createSlice({
    initialState,
    name: "complete",
    reducers: {
        addCompletedItem: (state, action: PayloadAction<Payload>) => {
            state.completed.push(action.payload)
        },
        removeCompletedItem: (state, action:PayloadAction<number>) => {
            state.completed = state.completed.filter ((item) => item.id !== action.payload)
        }
    }
})

export const { addCompletedItem,removeCompletedItem } = completedSlice.actions;
export default completedSlice.reducer;