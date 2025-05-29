
import { createSlice,PayloadAction } from "@reduxjs/toolkit"

interface DescriptionState {
    description: string
}

const initialState: DescriptionState = {
    description: ""
}

const descriptionSlice = createSlice({
    initialState,
    name: "desc",
    reducers: {
        descriptionTyping: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        resetDesc: (state) => {
            state.description = ""
        }
    }
})

export const { descriptionTyping,resetDesc} = descriptionSlice.actions;
export default descriptionSlice.reducer;