import { createContext } from "react";
import {
    reviewTransaction,
    proceedTransaction,
    declineTransaction,
    history
} from "../services/Api";

const TransactionContext = createContext();

const TransactionProvider = ({ children }) => {
    const review = async (data) => {
        return await reviewTransaction(data);
    }

    const proceed = async (data) => {
        return await proceedTransaction(data);
    }

    const decline = async (data) => {
        return await declineTransaction(data);
    }

    const getHistory = async (data) => {
        return await history(data);
    }

    return (
        <TransactionContext.Provider value={{ review, proceed, decline, getHistory }}>
            {children}
        </TransactionContext.Provider>
    )
}

export { TransactionContext, TransactionProvider };