import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HeaderState } from "../types/HeaderTypes"


const initialState = {
    isCollapsed: false
} as HeaderState

export const headerSlice = createSlice({
    name: "headerSlice",
    initialState,
    reducers: {
        setCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isCollapsed = action.payload
        }
    }
})

export const { actions: headerActions } = headerSlice
export const { reducer: headerReducer } = headerSlice