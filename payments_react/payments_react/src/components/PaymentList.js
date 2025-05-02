import './PaymentList.css';
import React, { useState, useEffect } from "react";
import { getAllPayments, getPaymentById, getPaymentsByUserId, getPaymentsByOrderId } from "../api";

export default function PaymentList() {
    const [payments, setPayments] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const res = await getAllPayments();
            setPayments(res.data);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch payments");
        } finally {
            setLoading(false);
        }
    };

    const fetchByPaymentId = async () => {
        if (!searchId) return;
        setLoading(true);
        try {
            const res = await getPaymentById(searchId);
            setPayments([res.data]);
        } catch (error) {
            console.error(error);
            alert("Payment not found");
        } finally {
            setLoading(false);
        }
    };

    const fetchByUserId = async () => {
        if (!searchId) return;
        setLoading(true);
        try {
            const res = await getPaymentsByUserId(searchId);
            setPayments(res.data);
        } catch (error) {
            console.error(error);
            alert("No payments found for this user");
        } finally {
            setLoading(false);
        }
    };

    const fetchByOrderId = async () => {
        if (!searchId) return;
        setLoading(true);
        try {
            const res = await getPaymentsByOrderId(searchId);
            setPayments(res.data);
        } catch (error) {
            console.error(error);
            alert("No payments found for this order");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <div className="payment-list-container">
            <h2>View Payments</h2>

            <div className="payment-controls">
                <input
                    type="text"
                    placeholder="Enter ID to search"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="search-input"
                />
                <div className="filter-buttons">
                    <button onClick={fetchAll} className="filter-btn all">All Payments</button>
                    <button onClick={fetchByPaymentId} className="filter-btn payment">By Payment ID</button>
                    <button onClick={fetchByUserId} className="filter-btn user">By User ID</button>
                    <button onClick={fetchByOrderId} className="filter-btn order">By Order ID</button>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading payments...</div>
            ) : payments.length === 0 ? (
                <div className="no-payments">No payments found</div>
            ) : (
                <div className="payments-table">
                    <div className="table-header">
                        <div>Payment ID</div>
                        <div>User ID</div>
                        <div>Order ID</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div>Date</div>
                    </div>
                    {payments.map((payment) => (
                        <div key={payment.id} className="payment-item">
                            <div>#{payment.id}</div>
                            <div>{payment.userId}</div>
                            <div>{payment.orderId}</div>
                            <div>${payment.amount}</div>
                            <div className={`status ${payment.paymentStatus.toLowerCase()}`}>
                                {payment.paymentStatus}
                            </div>
                            <div>{new Date(payment.paymentDate).toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}