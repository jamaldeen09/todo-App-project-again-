import { createSlice,PayloadAction } from "@reduxjs/toolkit";


// Interfaces
interface todoState {
    todoContainer: Payload[]
}


export interface Payload {
    task: string,
    isCompleted: boolean,
    id: number,
    description:string,
}


// reducers and initialstate
const initialState:todoState = {
    todoContainer: []
}


const todoSlice = createSlice({
    initialState,
    name: "container",
    reducers: {
        addItem: (state, action: PayloadAction<Payload>) => {
            state.todoContainer.push(action.payload)
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const configuredTodo = state.todoContainer.filter ((item: Payload) => item.id !== action.payload);
            state.todoContainer = configuredTodo
        },
        toggleComplete: (state, action: PayloadAction<number>) => {
            
            state.todoContainer = state.todoContainer.map((item) => {
                if (item.id === action.payload) {
                    return { ...item,isCompleted: !item.isCompleted }
                } else {
                    return item
                }
            })
        }
    }
})

export const { addItem,removeItem,toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;

