import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ui, { UIState } from "./features/ui";
import editor, { EditorState } from "./features/editor";


export type StoreState = {
    ui: UIState,
    editor: EditorState
}

export const store = configureStore({
	reducer: {
		ui,
        editor
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		})
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
