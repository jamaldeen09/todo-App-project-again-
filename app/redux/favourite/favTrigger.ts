import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface originalState {
    favTrig: boolean
}

const initialState: originalState = {
    favTrig: false
}

const favTrigSlice = createSlice({
    initialState,
    name: "favouriteTrigger",
    reducers: {
        activateFav: (state) => {
            state.favTrig = true
        },
        deactivateFav: (state) => { 
            state.favTrig = false
        }
    }
})

export const { activateFav,deactivateFav } = favTrigSlice.actions;
export default favTrigSlice.reducer;