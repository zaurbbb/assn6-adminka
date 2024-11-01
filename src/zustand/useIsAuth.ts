import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IsAuthState {
  isAuth: boolean;
}

interface IsAuthStoreActions {
  changeIsAuth: () => void;
}

type IsAuthStore = IsAuthState & IsAuthStoreActions;

export const useIsAuthStore = create<IsAuthStore>()(
  persist(
    (set) => ({
      isAuth: !!localStorage.getItem("accessToken"),
      changeIsAuth: () =>
        set(() => {
          const isAuth = !!localStorage.getItem("accessToken");
          return {
            isAuth,
          };
        }),
    }),
    {
      name: "zustand-is-auth",
    }
  )
);

