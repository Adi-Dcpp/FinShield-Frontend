import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.API_URL
})

const reviewTransaction = (data) => API.post("/transactions/review", data);

const proceedTransaction = (data) => API.post("/transactions/proceed", data);

const declineTransaction = (data) => API.post("/transactions/decline", data);

const history = (data) => API.post("/transactions/history", data);

export {
    reviewTransaction,
    proceedTransaction,
    declineTransaction,
    history
}