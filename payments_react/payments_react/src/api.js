import axios from "axios";

const PAYMENT_API = "http://localhost:8083/api/payments";


export const createPayment = (paymentData) => axios.post(PAYMENT_API, paymentData);
export const getAllPayments = () => axios.get(PAYMENT_API);
export const getPaymentById = (id) => axios.get(`${PAYMENT_API}/${id}`);
export const getPaymentsByUserId = (userId) => axios.get(`${PAYMENT_API}/user/${userId}`);
export const getPaymentsByOrderId = (orderId) => axios.get(`${PAYMENT_API}/order/${orderId}`);
export const updatePaymentStatus = (id, paymentData) => axios.put(`${PAYMENT_API}/${id}`, paymentData); // Changed to PUT
