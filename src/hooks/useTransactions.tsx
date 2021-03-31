import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";


interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string,
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

/* 
    Mesma ideia de interface para tipar os parametros
    porém, usando o Omit posso passar uma interface ou tipo já existente
    e apenas omitir o que não desejo, ao invés de declarar todas as propriedades novamente.
    também poderia usar o Pick para escolher quais propriedades eu quero incluir
*/
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData //forçando o tipo apenas para parar o alert de erro, não vai afetar a execução
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
      
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });

        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ])
    }
    
    return (
        <TransactionsContext.Provider value={{transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}