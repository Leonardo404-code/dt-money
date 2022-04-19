import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { api } from "../services/api";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

type TransactionsProviderProps = {
  children: ReactNode;
}

type TransactionsContextProps = {
  transactions: Transaction[];
  // eslint-disable-next-line no-unused-vars
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps,
);

export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then((res) => {
        setTransactions(res.data.transactions);
      });
  }, []);

  const createTransaction = async (transactionInput: TransactionInput) => {
    const copyTransactions = [...transactions];

    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    copyTransactions.push(transaction);

    setTransactions(copyTransactions);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
};
