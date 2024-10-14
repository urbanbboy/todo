import { RootState } from "@/app/providers/StoreProvider/store";

export const getCurrentUser = ( state: RootState ) => state.userReducer.userData