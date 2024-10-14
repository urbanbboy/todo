import { RootState } from "@/app/providers/StoreProvider/store";

export const getIsReadOnly = (state: RootState) => state.todoReducer.readOnly