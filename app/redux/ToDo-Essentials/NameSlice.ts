import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface NameState {
    name: string,
}

const initialState: NameState = {
    name: ""
}

const nameSlice = createSlice({
    initialState,
    name: "taskName",
    reducers: {
        nameTyping: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        resetName: (state) => {
            state.name = ""
        }
    }
})

export const { nameTyping,resetName } = nameSlice.actions;
export default nameSlice.reducer;
