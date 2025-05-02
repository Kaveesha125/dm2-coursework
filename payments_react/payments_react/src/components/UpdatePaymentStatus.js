import './UpdatePaymentStatus.css';
import React, { useState } from "react";
import { updatePaymentStatus } from "../api";

export default function UpdatePaymentStatus() {
    const [paymentId, setPaymentId] = useState("");
    const [status, setStatus] = useState("PENDING");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!paymentId) {
            alert("Please enter a Payment ID");
            return;
        }

        setLoading(true);
        try {
            await updatePaymentStatus(paymentId, { paymentStatus: status });
            alert("Payment status updated successfully!");
            setPaymentId("");
            setStatus("PENDING");
        } catch (error) {
            console.error(error);
            alert("Failed to update payment status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="update-status-container">
            <h2>Update Payment Status</h2>
            <div className="update-form">
                <div className="input-group">
                    <label>Payment ID</label>
                    <input
                        type="text"
                        placeholder="Enter Payment ID"
                        value={paymentId}
                        onChange={(e) => setPaymentId(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>New Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="FAILED">Failed</option>
                    </select>
                </div>
                <button
                    onClick={handleUpdate}
                    className="update-btn"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Status"}
                </button>
            </div>
        </div>
    );
}