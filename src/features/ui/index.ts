import { createReducer, createAction } from "@reduxjs/toolkit";

export interface UIState {
    title: string
}

const setTitle = createAction("ui/setTitle", (title: string) => {
    return {
        payload: {
            title: title
        }
    }
})

const initialState = {
    title: "Mat Labyrinth"
} as UIState

const reducer = createReducer(initialState, (builder) => {
    builder.addCase(setTitle, (state, action) => {
        state.title = action.payload.title
    })
})

export default reducer;