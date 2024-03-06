import { create } from 'zustand';

type BalanceStore = {
    balance: number;
    addMoney: (bet: number) => void;
    loseMoney: (bet: number) => void;
};

export const useBalanceStore = create<BalanceStore>((set) => ({
    balance: 1000,
    addMoney: (bet) => {
        set((state) => ({balance: state.balance + bet}));
        console.log(bet);
    },
    loseMoney: (bet) => {
        set((state) => ({balance: state.balance - bet}))
    }
}));
