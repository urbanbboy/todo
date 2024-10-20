import { RootState } from "@/app/providers/StoreProvider/store";


export const getSidebarCollapsed = (state: RootState) => state.headerReducer.isCollapsed