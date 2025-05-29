import { createSlice } from "@reduxjs/toolkit";

interface ModalActivator {
    modalActivate: boolean
}

const initialState: ModalActivator = {
    modalActivate: false
}

const modalSlice = createSlice({
    initialState,
    name: "modal",
    reducers: {
        activate: (state): void => {
            state.modalActivate = true
        },
        deactivate: (state): void => {
            state.modalActivate = false
        }
    }
})

export const { activate,deactivate } = modalSlice.actions;
export default modalSlice.reducer;
