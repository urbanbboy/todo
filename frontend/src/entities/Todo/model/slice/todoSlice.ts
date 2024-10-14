import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TodoSchema } from "../types/TodoType"

const initialState: TodoSchema = {
    readOnly: true
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readOnly = action.payload
        },
        setCancelEdit: (state, action: PayloadAction<boolean>) => {
            state.readOnly = action.payload
        },
    }
})


export const { actions: todoActions } = todoSlice
export const { reducer: todoReducer } = todoSlice