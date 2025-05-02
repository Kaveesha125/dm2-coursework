import './App.css';
import React from "react";
import PaymentForm from "./components/PaymentForm";
import PaymentList from "./components/PaymentList";
import UpdatePaymentStatus from "./components/UpdatePaymentStatus";

export default function App() {
    return (
        <div className="app-container">
            <h1>Payment Management App</h1>

            <section className="section">
                <h2>Create Payment</h2>
                <PaymentForm />
            </section>

            <section className="section">
                <h2>View Payments</h2>
                <PaymentList />
            </section>

            <section className="section">
                <h2>Update Payment Status</h2>
                <UpdatePaymentStatus />
            </section>
        </div>
    );
}