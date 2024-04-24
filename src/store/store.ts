import { create } from 'zustand';

type BalanceStore = {
    balance: number;
    addMoney: (bet: number) => void;
    loseMoney: (bet: number) => void;
    reset: () => void;
};

export const useBalanceStore = create<BalanceStore>((set) => ({
    balance: 1000,
    addMoney: (bet) => {
        set((state) => ({balance: state.balance + bet}));
    },
    loseMoney: (bet) => {
        set((state) => ({balance: state.balance - bet}))
    },
    reset: () => {
        set({balance:1000})
    }
}));