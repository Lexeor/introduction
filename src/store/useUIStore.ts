import { create } from 'zustand';

const LANGUAGE_SELECTED_KEY = 'i18nextUserSelected';

interface UIState {
    isGlobalLoading: boolean;
    isLanguageSelected: boolean;
    setIsGlobalLoading: (isLoading: boolean) => void;
    setIsLanguageSelected: (isSelected: boolean) => void;
    triggerLoading: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isGlobalLoading: false,
    isLanguageSelected: localStorage.getItem(LANGUAGE_SELECTED_KEY) === 'true',
    setIsGlobalLoading: (isLoading) => set({ isGlobalLoading: isLoading }),
    setIsLanguageSelected: (isSelected) => set({ isLanguageSelected: isSelected }),
    triggerLoading: () => set({ isGlobalLoading: true }),
}));
