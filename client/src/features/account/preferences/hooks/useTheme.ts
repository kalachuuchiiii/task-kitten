import { create } from "zustand";

export const useTheme = create<{isDarkMode: boolean, toggleDarkMode: () => void}>((set) => ({
    isDarkMode: JSON.parse(localStorage.getItem('taskitten-isDark') ?? 'true') ?? true,
    toggleDarkMode: () => set((state) => {
        const nextValue = !state.isDarkMode;
        localStorage.setItem('taskitten-isDark', JSON.stringify(nextValue));
        return ({ isDarkMode: nextValue })
    })
}))