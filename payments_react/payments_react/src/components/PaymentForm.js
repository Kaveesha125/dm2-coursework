import './PaymentForm.css';
import React, { useState } from "react";
import { createPayment } from "../api";

export default function PaymentForm() {
    const [formData, setFormData] = useState({
        userId: "",
        orderId: "",
        amount: "",
        paymentStatus: "PENDING",
        paymentDate: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPayment(formData);
            alert("Payment created successfully!");
            setFormData({
                userId: "",
                orderId: "",
                amount: "",
                paymentStatus: "PENDING",
                paymentDate: "",
            });
        } catch (error) {
            console.error(error);
            alert("Failed to create payment.");
        }
    };

    return (
        <div className="payment-form-container">
            <h2>Create Payment</h2>
            <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-row">
                    <input
                        name="userId"
                        placeholder="User ID"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="orderId"
                        placeholder="Order ID"
                        value={formData.orderId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="amount"
                        placeholder="Amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleChange}
                        className="status-select"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="FAILED">Failed</option>
                    </select>
                    <input
                        name="paymentDate"
                        type="datetime-local"
                        value={formData.paymentDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Submit Payment</button>
            </form>
        </div>
    );
}