import React from "react";
import QRScanner from "../../components/QRScanner";

export default function CheckinCheki() {
    return (
        <div className="container mt-5 text-center">
            <h2>Check Validitas Cheki</h2>
            <QRScanner />
        </div>
    );
}
