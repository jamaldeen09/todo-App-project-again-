import { createSlice,PayloadAction } from "@reduxjs/toolkit"
import { Payload } from "../ToDo-Essentials/TodoReducer"

interface structure {
    uncompletedArr: Payload[]
}

const initialState: structure = {
    uncompletedArr: []
}

const uncompletedSlice = createSlice({
    initialState,
    name: "uncompleted",
    reducers: {
        addUncompleted: (state, action: PayloadAction<Payload>) => {
            const exists = state.uncompletedArr.find((item: Payload) => item.id === action.payload.id)

            if (!exists){
                state.uncompletedArr.push(action.payload)
            }
        },
        removeUncompleted: (state, action: PayloadAction<number>) => {
            const newArr = state.uncompletedArr.filter((item: Payload) => item.id !== action.payload)
            state.uncompletedArr = newArr;
        }
    }
})

export const { addUncompleted,removeUncompleted } = uncompletedSlice.actions;
export default uncompletedSlice.reducer;