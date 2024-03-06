import { create } from 'zustand';

type BalanceStore = {
    balance: number;
    addMoney: () => void;
    loseMoney: () => void;
};

export const useBalanceStore = create<BalanceStore>((set) => ({
    balance: 1000,
    addMoney: () => {
        set((state) => ({balance: state.balance + 100}));
    },
    loseMoney: () => {
        set((state) => ({balance: state.balance - 100}))
    }
}));
