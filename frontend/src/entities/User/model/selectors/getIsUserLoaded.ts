import { RootState } from "@/app/providers/StoreProvider/store";

export const getIsUserLoaded = (state: RootState) => state.userReducer.isLoaded