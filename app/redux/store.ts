import { configureStore } from "@reduxjs/toolkit"
import todoSlice from "./ToDo-Essentials/TodoReducer"
import modalSlice from "./Modal/ModalActivation"
import nameSlice from "./ToDo-Essentials/NameSlice"
import descriptionSlice from "./ToDo-Essentials/Description"
import completedSlice from "./completed/Completed"
import completedTriggerSlice from "./completed/TriggerShow"
import favSlice from "./favourite/favourite"
import allTrigSlice from "./allTrigger/allTrig"
import favTrigSlice from "./favourite/favTrigger"
import uncompletedSlice from "./uncompleted/uncompleted"
import uncompletedTrigSlice from "./uncompleted/uncompletedTrig"



export const store = configureStore( {
    reducer: {
        // slices goes here
        container: todoSlice,
        modal: modalSlice,
        taskName: nameSlice,
        desc: descriptionSlice,
        complete: completedSlice,
        triggerComp: completedTriggerSlice,
        favourite: favSlice,
        allTrig: allTrigSlice,
        favouriteTrigger: favTrigSlice,
        uncompleted: uncompletedSlice,
        uncompletedTrigg: uncompletedTrigSlice
    }
} )

export type RootState = ReturnType<typeof store.getState>
export type  AppDispatch = typeof store.dispatch