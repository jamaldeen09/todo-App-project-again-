import { Payload } from './../ToDo-Essentials/TodoReducer';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface structure {
    favTasks: Payload[]
}

const initialState: structure = {
    favTasks: []
}

const favSlice = createSlice({
    initialState,
    name: "favourite",
    reducers: {
        addFav: (state, action: PayloadAction<Payload>) => {
            const exists = state.favTasks.find((item: Payload) => item.id === action.payload.id)

            if (!exists){
                state.favTasks.push(action.payload)
            }
        },
        removeFav: (state, action: PayloadAction<number>) => {
            const transformedFav = state.favTasks.filter ((item: Payload) => item.id !== action.payload)

            state.favTasks = transformedFav
        },

        toggleFavourite: (state, action: PayloadAction<number>) => {

            state.favTasks.map((task: Payload)=> {
                if (task.id === action.payload) {
                    return { ...task,isFavourite: !task.isFavourite}
                } else {
                    return task
                }
            })
        }
        
    }
})

export const { addFav,removeFav,toggleFavourite } = favSlice.actions;
export default favSlice.reducer;