import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";


interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createAt: string,
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;
}

/* 
    Mesma ideia de interface para tipar os parametros
    porém, usando o Omit posso passar uma interface ou tipo já existente
    e apenas omitir o que não desejo, ao invés de declarar todas as propriedades novamente.
    também poderia usar o Pick para escolher quais propriedades eu quero incluir
*/
type TransactionInput = Omit<Transaction, 'id' | 'createAt'>;

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData //forçando o tipo apenas para parar o alert de erro, não vai afetar a execução
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransaction] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransaction(response.data.transactions))
    }, []);

    function createTransaction(transaction: TransactionInput) {
      
        api.post('/transactions', transaction);
    }
    
    return (
        <TransactionsContext.Provider value={{transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}