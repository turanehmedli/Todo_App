import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
  isDarkmodeOn: boolean;
  toggleDarkmode: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkmodeOn: false,

      toggleDarkmode: () =>
        set((state) => ({
          isDarkmodeOn: !state.isDarkmodeOn,
        })),
    }),
    {
      name: "theme",
    }
  )
);