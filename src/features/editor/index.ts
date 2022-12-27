import { createReducer } from "@reduxjs/toolkit";
import loadCodeFromFile from "./fileHandler";

export interface EditorState {
    code: string;
    fileLoad: {
        loading: boolean;
        success: boolean;
        result: string | null;
    }
}

const initialState = {
    code: "# $\\sqrt{a^2 + b^2}$",
    fileLoad: {
        loading: false,
        success: false,
        result: null
    }
} as EditorState

const reducer = createReducer(initialState, builder => {
    builder.addCase(loadCodeFromFile.pending, (state, action) => {
        state.fileLoad.loading = true;
        state.fileLoad.success = initialState.fileLoad.success
    })
    builder.addCase(loadCodeFromFile.fulfilled, (state, action) => {
        state.fileLoad.loading = initialState.fileLoad.loading;
        state.fileLoad.result = action.payload
    })
})

export default reducer;