    import React from "react";
    import ReactDOM from "react-dom/client"; // Import from react-dom/client
    import App from "./App";
    import "./index.css"; // If you are using it

    // Use ReactDOM.createRoot to create the root element
    const root = ReactDOM.createRoot(document.getElementById("root"));

    // Render the App component inside the root
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
